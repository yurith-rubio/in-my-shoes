import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import useFetch from './useFetch';
import { useNavigate } from 'react-router';

function verification() {
    const value = useContext(ThemeContext);
    const navigate = useNavigate();
    const userInfo = value.userInfo;
    const { post } = useFetch("/api");
    const sent = useRef(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (sent.current === false) {
            post("/send-email", { email: userInfo.email });
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
        const verificationCode = event.target[0].value + event.target[1].value + event.target[2].value + event.target[3].value + event.target[4].value;

        // post("/verify", { email: userInfo.email, code: verificationCode });
        post("/verify", { email: userInfo.email, code: verificationCode })
            .then((data: any) => {
                if (data.error) {
                    console.log("error: ")
                    setError(true);
                    return
                }
                setError(false);
                navigate("/get-info");
            })
    }

    return (
        <div>
            <h1>We sent an email to: {userInfo.email}</h1>
            <p>{ error ? "The code does not match, please check if you wrote the code properly and try again" : ""}</p>
            <form onSubmit={handleSubmitForm}>
                <input className='input-verification' type="text" id="verification-one" name="one" maxLength={1} onKeyUp={ () => focusElement("verification-two") } />
                <input className='input-verification' type="text" id="verification-two" name="two" maxLength={1}  onKeyUp={() => focusElement("verification-three")} />
                <input className='input-verification' type="text" id="verification-three" name="three" maxLength={1}  onKeyUp={() => focusElement("verification-four")} />
                <input className='input-verification' type="text" id="verification-four" name="four" maxLength={1}  onKeyUp={() => focusElement("verification-five")} />
                <input className='input-verification' type="text" id="verification-five" name="five" maxLength={1} onKeyUp={() => focusElement("verification-one")} />

                <button id='btn-verification' type="submit" disabled>Submit</button>
            </form>
        </div>
        
    )
}

export default verification;