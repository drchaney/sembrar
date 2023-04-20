import { Category } from "./"
import "./body.css"
import mainlogo from "../assets/SEMBRAR.png"

export default function Menu({navHover, setNavHover, setToken, token, setEmail, email}){    

    return (
        <>
            {
                navHover? <Category navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} setEmail={setEmail} email={email}/>: null
            }  
        </>
    )
}