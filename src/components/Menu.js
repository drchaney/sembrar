import { Category } from "./"
import "./body.css"
import mainlogo from "../assets/SEMBRAR.png"

export default function Menu({navHover, setNavHover, setToken, token, userId, setUserId, userEmail, setUserEmail}){    

    return (
        <>
            {
                navHover? <Category navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} userId={userId} setUserId={setUserId} userEmail={userEmail} setUserEmail={setUserEmail}/>: null
            }  
        </>
    )
}