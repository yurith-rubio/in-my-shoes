import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.tsx";

function GetNicknameCountry() {
    const value = useContext(ThemeContext);
    const category = value.category;
    const userInfo = value.userInfo;
    const setUserInfo = value.setUserInfo;
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [country, setCountry] = useState("");

    function handleSubmitForm(event: any) {
        event.preventDefault();
        if (category === "worry") {
            navigate("/write-worry", { state: { new_user: true } })
        } else {
            navigate("/select-answer");
        }
    }

    useEffect(() => {
        setUserInfo({ ...userInfo, nickname: nickname, country: country });
    }, [nickname, country])

    return (
        <div>
            <form className='form-wrapper' onSubmit={(e) => handleSubmitForm(e)}>
                <div className="input-wrapper">
                    <div className="input-heading">Nickname:</div>
                    <input id="nickname-id" name="nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Nickname" className='text-input' required />
                </div>
                <div className="input-wrapper">
                    <div className="input-heading">Country:</div>
                    <input id="country-id" name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className='text-input' required />
                </div>
                <button type="submit" className='btn-primary btn-get-info'>
                    <div className='btn-border'></div>
                    Next
                </button>
            </form>
        </div>
    )
}

export default GetNicknameCountry;