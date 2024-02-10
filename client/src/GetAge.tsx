import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.tsx";

enum Category {
    worry = "worry",
    answer = "answer"
}

function GetAge() {
    const navigate = useNavigate();
    const value = useContext(ThemeContext);
    const category: Category = value.category;
    const userInfo = value.userInfo;
    const setUserInfo = value.setUserInfo;
    const [age, setAge] = useState(0);
    
    function handleSubmitForm(event: any) {
        event.preventDefault();
        if (category === "worry") {
            // navigate("/get-info", { state: { new_user: true } })
            navigate("/get-info")
        } else {
            console.log("go to get info for answer")
            navigate("/get-info")
        }
    }

    useEffect(() => {
        if (category === "worry") {
            setAge(10);
        } else {
            setAge(20);
        }
    }, []);
    
    useEffect(() => {
        setUserInfo({ ...userInfo, age: age });
    }, [age]);

    return (
        <div>
            <form action="" className='form-wrapper' onSubmit={(e) => handleSubmitForm(e)}>
                <div className="input-wrapper">
                    <div className="input-heading">I am in my:</div>
                    <select id="age-id" name="age" value={age} onChange={(e) => setAge(parseInt(e.target.value, 10))} className='info-selector'>
                        {category === "worry" &&
                            <option className='age-range' value={10}>10's</option>
                        }
                        <option className='age-range' value={20}>20's</option>
                        <option className='age-range' value={30}>30's</option>
                        <option className='age-range' value={40}>40's</option>
                        <option className='age-range' value={50}>50's</option>
                        <option className='age-range' value={60}>60's</option>
                        <option className='age-range' value={70}>70's</option>
                        <option className='age-range' value={80}>80's</option>
                        <option className='age-range' value={90}>90's</option>
                    </select>
                </div>
                <button type="submit" className='btn-primary btn-get-info'>
                    <div className='btn-border'></div>
                    Next
                </button>
            </form>
        </div>
    )
}

export default GetAge;