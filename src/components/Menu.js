import { Category } from "./"
import "./body.css"
import mainlogo from "../assets/SEMBRAR.png"

export default function Menu({navHover, setNavHover, setToken, token, setEmail, email, userId}){    

    return (
        <>
            {
                navHover? <Category navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} setEmail={setEmail} email={email} userId={userId}/>: null
            }  
        </>
    )
}