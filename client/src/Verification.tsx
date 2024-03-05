import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import useFetch from './useFetch';
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { IContextValue } from './typings/IContextValue';
import IUser from './typings/IUser';

function verification() {
    const location = useLocation();
    const email: string = location.state.email;

    const navigate = useNavigate();

    const value = useContext<IContextValue>(ThemeContext);
    const userInfo = value.userInfo;
    const setUserInfo = value.setUserInfo;


    const { post } = useFetch("/api");
    const sent = useRef(false);
    const [error, setError] = useState(false);

    const CodeInput = styled.input`
        width: 80px;
        height: 80px;
        margin: 0 5px;
        text-align: center;
        border-radius: 15px;
        border: none;
    `;

    useEffect(() => {
        if (sent.current === false) {
            post("/send-email", { email: email });
        }

        return () => {
            sent.current = true;
        }
    }, []);

    function checkIfAllFieldsAreFilled() {
        const inputs = document.querySelectorAll(".input-verification");
        let allFilled = true;
        inputs.forEach((input: any) => {
            if (input.value === "") {
                allFilled = false;
            }
        });

        if (allFilled) {
            document.querySelector("#btn-verification")?.removeAttribute("disabled");
        } else {
            document.querySelector("#btn-verification")?.setAttribute("disabled", "true");
        }

        const button = document.querySelector("#btn-verification");
        (button as HTMLElement).focus();

    }

    function focusElement(element: string) {
        const input = document.querySelector(`#${element}`);
        if (input) {
            (input as HTMLElement).focus();
        }
        checkIfAllFieldsAreFilled();
    }

    function handleSubmitForm(event: any) {
        event.preventDefault();
        const verificationCode: string = event.target[0].value + event.target[1].value + event.target[2].value + event.target[3].value + event.target[4].value;

        // post("/verify", { email: userInfo.email, code: verificationCode });
        post("/verify", { email: email, code: verificationCode })
            .then(async (data: any) => {
                if (data.error) {
                    console.log("error: ")
                    setError(true);
                    return
                }
                setError(false);

                // Check if the user already exists
                
                const user = await post("/users", { email }) as IUser;
                
                if (user.email === email) {
                    // Set the user info from the database
                    console.log("this user already exists");
                    setUserInfo(user);
                    navigate("/write-worry", { state: { new_user: false } });
                    return;
                } else {
                    console.log("this is a new user");
                    // Set the user info from the form
                    setUserInfo(
                        {
                            ...userInfo,
                            email: email
                        }
                    );
                    navigate("/get-age");
                }
            })
        
        // const data = await post("/users", { email }) as Data[];
        // const user = data[0];
        // if (user) {
        //     // Set the user info from the database
        //     console.log("this user already exists");
        //     setUserInfo(user);
        //     navigate("/write-worry", { state: { new_user: false }});
        // } else {
        //     console.log("this is a new user");
        //     // Set the user info from the form
        //     setUserInfo(
        //         {
        //             ...userInfo,
        //             email: email
        //         }
        //     )
        //     navigate("/verification");
        // }

    }

    let numbers: string[] = ["one", "two", "three", "four", "five"];
    let nextInput: string[] = ["two", "three", "four", "five", "one"];

    return (
        <div className='section column'>
            <h2 className='center'>We sent an email to: <br></br> {email}</h2>
            <p>{ error ? "The code does not match, please check if you wrote the code properly and try again" : ""}</p>
            <form onSubmit={handleSubmitForm} className='form-wrapper center'>
                <div>
                    {
                        numbers.map((number: string, key: number) => {
                            return <CodeInput type="text"
                                id={`verification-${number}`}
                                name={`${number}`} maxLength={1}
                                onKeyUp={() => focusElement(`verification-${nextInput[key]}`)}
                                className={`input-verification`} key={key} />
                        })
                    }
                </div>
                <div>
                    <button id='btn-verification' className='btn-primary' type="submit" disabled>
                        Submit
                        <div className='btn-border'></div>
                    </button>
                </div>
            </form>
        </div>
        
    )
}

export default verification;