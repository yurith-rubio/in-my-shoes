import { useContext, useState } from "react";
import { useNavigate } from "react-router";
// import { ThemeContext } from "./ThemeContext.tsx";

function GetEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    // const [loading, setLoading] = useState(false);
    

    async function handleSubmitForm(e: React.FormEvent<HTMLFormElement> ): Promise<void> {
        e.preventDefault();
        navigate("/verification", { state: { email: email }})
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