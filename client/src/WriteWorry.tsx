import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.tsx";
import useFetch from "./useFetch.tsx";

function WriteWorry() {
    const location = useLocation();
    const value = useContext(ThemeContext);
    const userInfo = value.userInfo;
    const [worry, setWorry] = useState("");
    const [worryInfo, setWorryInfo] = useState({});
    const navigate = useNavigate();
    const { put } = useFetch("/api");
    const new_user = location.state.new_user;
    

    console.log("userInfo");
    console.log(userInfo);
    
    function handleSubmitForm(event: any) {
        event.preventDefault();

        if (new_user === true) {
            put("/users", userInfo)
                .then(data => {
                    return data;
                })
                .then(data => {
                    const id = data;
                    put("/worries", { ...worryInfo, user_id: id })
                })
                .catch(error => console.log(error))
        } else {
            put("/worries", { ...worryInfo, user_id: userInfo.id })
        }
        navigate("/thank-you");
    }

    useEffect(() => {
        setWorryInfo({
            email: userInfo.email,
            worry: worry,
        })
    }, [worry])


    return (
        <div>
            {!new_user ? <h1 className='h2-p center'>Welcome back <br></br> { userInfo.nickname }</h1> :
            <h1>Write your worry</h1>}
            <form className='form-wrapper' onSubmit={(e) => handleSubmitForm(e)}>
                <div className="input-wrapper">
                    <div className="input-heading">What are you afraid of in your {userInfo.age}'s?</div>
                    <textarea className="text-area" value={worry} onChange={(e) => setWorry(e.target.value)} placeholder="Worry" ></textarea>
                </div>
                <button type="submit" className='btn-primary btn-get-info'>
                    <div className='btn-border'></div>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default WriteWorry;