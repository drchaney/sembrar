import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ setToken, token, setEmail, email }){    
    const [password, setPassword] = useState('')

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    async function loginSubmit(event) {
        event.preventDefault();

        try {
            const URL = "http://localhost:4000/api/users/login"
            const response = await fetch(URL, {
                method: "POST",
                ContentType: "application/jason",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const result = await response.json()
            setToken(result.token)
            setEmail(result.user.email) 
            localStorage.setItem("token", result.token);   
            localStorage.setItem("user", result.user.email);   
        } catch (error){
            console.error ("There was an error: ", error);
        }
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken("")
        setEmail("")
    }

    return (
        token?
        <>
            <div className="container">
                <div className="m-4">Hey, {email}!</div>
                <ul>
                    <li>Want to review your profile?</li>
                    <li>Change your password?</li>
                    <li>Check your old orders?</li>
                </ul>
                <button type="submit" className="btn btn-success m-3" onClick={logout}>Logout</button>
            </div>
        </>


        :<>
            <form className="container" onSubmit={loginSubmit}>
                
                <div className="login-dropdown input-group m-3">
                    <span className="input-group-text">@</span>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" onChange={handleEmail} value={email}/>
                        <label htmlFor="floatingInputGroup1">Email</label>
                    </div>
                </div>
                <div className="login-dropdown input-group m-3">
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePassword} value={password}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-success m-3">Login</button>
        
            </form>
            <Link to="../Register"><button type="button" className="btn btn-success m-3">New Users - Create an Account</button></Link>
        </>
    )
}