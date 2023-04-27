import { useState } from "react";
import { useNavigate } from "react-router";
import { Register } from "./"

export default function Login({ setToken, token, setNavHover }){    
    const [formToDisplay, setFormToDisplay] = useState("defaultLogin")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState("")
    const [passwordCheck, setPasswordCheck] = useState('')
    const [emailCheck, setEmailCheck] = useState('')
    const navigate = useNavigate();
    
    const handleMouseExitClick = () => {
        setFormToDisplay("defaultLogin")
        setNavHover("")
    }

    const handleMouseRegisterClick = () => {
        setEmail("")
        setPassword("")
        setFormToDisplay("registerStepOne")
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleEmailCheck = (event) => {
        setEmailCheck(event.target.value);
    }

    const handlePasswordCheck = (event) => {
        setPasswordCheck(event.target.value);
    }

    const registerStepOneSubmit = (event) => {
        event.preventDefault();
        setResponse("")
        if (!email.includes('@') || !email.includes('.')) {
            setResponse("invalidEmail")
            return;
        }
        if (password.length < 8 ){
            setResponse("tooShort")
            return;
        }
        setFormToDisplay("registerStepTwo");
    }

    const registerStepTwoSubmit = (event) => {
        event.preventDefault();
        if(email != emailCheck || password != passwordCheck){
            setResponse("noMatch")
            return;
        }
        setResponse("registerAttempt")
    }

    const clearForm = (event) =>{
        setEmail("")
        setPassword("")
        setEmailCheck("")
        setPasswordCheck("")
        setResponse("")
        setFormToDisplay("defaultLogin")
        
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
            if (result.error){
                setResponse(result.name)
            } else if (result.user.email == email){
                setToken(result.token)
                localStorage.setItem("token", result.token);   
                localStorage.setItem("user", result.user.email);
            }   
        } catch (error){
            console.error ("There was an error: ", error);
        }
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken("")
        setResponse("")
        setEmail("")
        setPassword("")
        setEmailCheck("")
        setPasswordCheck("")
        setFormToDisplay("defaultLogin")
        navigate('/')
    }

    return(
        <div className="login-popup-wrapper">
            <div className="login-popup-sub-wrapper">
                {
                    token?
                        response == "success"?
                            <>
                                <div className="container">
                                    <h5 className="green-text text-center m-3">Success!</h5>
                                        <p className="m-3 text-green">Thank you for signing up!</p>
                                        <button type="submit" className="btn btn-success login-button my-3" onClick={handleMouseExitClick}>Continue Shopping</button>
                                </div>
                            </>

                        :<>
                            <div className="container">
                                <div className="m-4">Hey, person you!</div>
                                <ul>
                                    <li>Want to review your profile?</li>
                                    <li>Change your password?</li>
                                    <li>Check your old orders?</li>
                                </ul>
                                <button type="submit" className="btn btn-success m-3" onClick={logout}>Logout</button>
                            </div>
                        </>

                    :formToDisplay == "defaultLogin"?
                        <>
                            <form className="container" onSubmit={loginSubmit}>
                                <h2 className="green-text text-center m-3">Login</h2>
                                <div className="login-dropdown input-group m-3">
                                    <span className="input-group-text"><i className="green-text bi bi-person-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" onChange={handleEmail} value={email}/>
                                        <label htmlFor="floatingInputGroup1">Email</label>
                                    </div>
                                </div>
                                <div className="login-dropdown input-group m-3">
                                <span className="input-group-text"><i className="green-text bi bi-lock-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePassword} value={password}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-success login-button">Login</button>
                                    <p className="m-3">Forgot password?</p>
                                </div>
                                <hr/>
                            </form>
                            <div className="container text-center">
                                <p className="login-button">Not registered? <a href="#" className="green-text" onClick={handleMouseRegisterClick}>Create an account.</a></p>
                            </div>
                            {
                                response?
                                <div className="container text-center">
                                    <hr/>
                                    <p className="text-red">Username or password incorrect</p>
                                </div>:null
                            }
                        </>

                    :formToDisplay == "registerStepOne"?
                        <>
                            <form className="container" onSubmit={registerStepOneSubmit}>
                            <h2 className="green-text text-center m-3">Register</h2>
                                <div className="login-dropdown input-group m-3">
                                    <span className="input-group-text"><i className="green-text bi bi-person-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" onChange={handleEmail} value={email}/>
                                        <label htmlFor="floatingInputGroup1">Email</label>
                                    </div>
                                </div>
                                <div className="login-dropdown input-group m-3">
                                <span className="input-group-text"><i className="green-text bi bi-lock-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePassword} value={password}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div className="container text-center">
                                    <button type="submit" className="btn btn-success login-button my-3">Create Account</button>
                                    {
                                        response == "invalidEmail" ? <p className="m-3 text-red">Not a valid email</p>
                                        :response == "tooShort" ? <p className="m-3 text-red">Password too short</p>
                                        :null                            
                                    }
                                </div>
                            </form>
                        </>

                    :formToDisplay == "registerStepTwo"?
                        <>
                            <form className="container" onSubmit={registerStepTwoSubmit}>
                            <h5 className="green-text text-center m-3">Confirm Email:</h5>
                                <div className="login-dropdown input-group m-3">
                                    <span className="input-group-text"><i className="green-text bi bi-person-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Username" onChange={handleEmailCheck} value={emailCheck}/>
                                        <label htmlFor="floatingInputGroup1">Email</label>
                                    </div>
                                </div>
                                <h5 className="green-text text-center m-3">Confirm Password:</h5>
                                <div className="login-dropdown input-group m-3">
                                <span className="input-group-text"><i className="green-text bi bi-lock-fill"></i></span>
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handlePasswordCheck} value={passwordCheck}/>
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>
                                </div>
                                <div className="container text-center">
                                    {
                                        response == "registerAttempt" ? <><p className="m-3 text-green">Registering...</p><Register email={email} password={password} formToDisplay={formToDisplay} setResponse={setResponse} setToken={setToken}/></>
                                        : response == "EmailExistsError" ? <><p className="m-3 text-red">Email already exists</p><button type="button" onClick={clearForm} className="btn btn-success login-button my-3">Try Again</button></>
                                        : response == "InvalidEmailError" ? <><p className="m-3 text-red">Not a valid email</p><button type="button" onClick={clearForm} className="btn btn-success login-button my-3">Try Again</button></>
                                        : response == "PasswordLengthError" ? <><p className="m-3 text-red">Password too short</p><button type="button" onClick={clearForm} className="btn btn-success login-button my-3">Try Again</button></>
                                        : response == "RegistrationError" ? <><p className="m-3 text-red">Something went wrong, try again</p><button type="button" onClick={clearForm} className="btn btn-success login-button my-3">Try Again</button></>
                                        : response == "success" ? setFormToDisplay("success")
                                        : <button type="submit" className="btn btn-success login-button my-3">Create Account</button>
                                    }
                                </div>
                            </form>
                        </>
                   
                    :formToDisplay == "forgotPass"?
                        <>
                          <form className="container" onSubmit={registerFinalSubmit}>
                            <h5 className="green-text text-center m-3">Forgot password:</h5>
                            <p className="m-3 text-green">Type in email to reset password!</p>
                            </form>
                        </>
                    :null
                }
            </div>
        </div>
    )
}