import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext.tsx";
import useFetch from "./useFetch.tsx"

class WorryInfo {
    public worry: string = "";
    public nickname: string = "";
    public age: number = 0;
}

function ReadWorry() {
    const navigate = useNavigate();
    const value = useContext(ThemeContext);
    const location = useLocation();
    const id = location.state.id;
    const [worryInfo, setWorryInfo] = useState<WorryInfo | null>(null);
    const [answer, setAnswer] = useState("");
    const [allAnswers, setAllAnswers] = useState([]);
    const userInfo = value.userInfo;
    const { post } = useFetch("/api");

    function handleSubmitForm(event: any) {
        event.preventDefault();

        const answerInfo = {
            worry_id: id,
            nickname: userInfo.nickname,
            country: userInfo.country,
            age: userInfo.age,
            answer: answer
        }

        console.log("answer info: ", answerInfo);
        const submitAnswer = post("/submit-answer", answerInfo);
        console.log("submit answer: ", submitAnswer);
    }

    function handleRedirectButton() {
        navigate("/select-answer");
    }

    useEffect(() => {        
        fetch(`/api/load-worry/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWorryInfo(data)
            })
            .catch(err => console.log(err));
        
        fetch(`/api/load-answers/${id}`)
            .then(res => res.json())
            .then(data => {
                setAllAnswers(data)
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log("worryInfo: ", worryInfo);
    }, [worryInfo])

    return (
        <section id="ReadWorry" className="section column">
            {/* <h1>Read Worry</h1> */}
            <div className="worry-wrapper">
                <h1 className="h2">Worry</h1>
                <p className="rich-text info-worry">{ worryInfo?.worry }</p>
                <p className="author-info">
                    <span>{ worryInfo?.nickname }</span>
                    <span>{ worryInfo?.age }</span>
                </p>
            </div>
            <form className='form-wrapper' onSubmit={event => handleSubmitForm(event)}>
                <textarea className="text-area" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your advice about this worry in here"></textarea>
                <label htmlFor="submit-worry" className="btn-primary submit-worry">
                    <div className='btn-border'></div>
                    Submit answer
                </label>
                <input id="submit-worry" type="submit" value="Submit" />
            </form>
            <div className="answers-wrapper">
                {allAnswers.length > 0 &&
                    <div className="h3 answers-title">Answers</div>
                }
                {allAnswers.length > 0 && allAnswers.map((advisor: any, key: any) => {
                    return (
                        <div key={key} className="answer">
                            <p>{advisor.answer}</p>
                            <p className="author-info">
                                <span>{ advisor.nickname }</span>
                                <span>{ advisor.age }</span>
                            </p>
                        </div>
                    )
                })
                    }
            </div>
            <button className='btn-primary' onClick={handleRedirectButton}>
                <div className='btn-border'></div>
                See other worries
            </button>
        </section>
    );
}

export default ReadWorry;