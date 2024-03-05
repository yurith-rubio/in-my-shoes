import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "./ThemeContext.tsx";
import useFetch from "./useFetch.tsx"

function GetEmail() {
    const navigate = useNavigate();
    const value = useContext(ThemeContext);
    const userInfo = value.userInfo;
    const setUserInfo = value.setUserInfo;
    const [email, setEmail] = useState("");
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    // const [loading, setLoading] = useState(false);
    const { post } = useFetch("/api");

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement> ): Promise<void> {
        e.preventDefault();

        // class Data {
        //     public id: number = 0;
        //     public nickname: string = "";
        //     public age: number = 0;
        //     public country: string = "";
        //     public email: string = "";
        // }

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
        setUserInfo(
            {
                ...userInfo,
                email: email
            }
        )
        navigate("/verification");
    }

    return (
        <div>
            <form onSubmit={handleSubmitForm} className='form-wrapper'>
            <div className="input-wrapper">
                <div className="input-heading">My email:</div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-input' required/>
                </div>
                {/* disabled={loading} - add later */}
            <button type="submit"  className='btn-primary btn-get-info'>
                <div className='btn-border'></div>
                Verify email
            </button>
        </form>
        {/* {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>} */}
        </div>
    );
}

export default GetEmail;