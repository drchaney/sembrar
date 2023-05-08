import { useState, useEffect } from "react";

export default function Register({setUserEmail, setAccess, setUserId, email, password, formToDisplay, setResponse, setToken}){

    useEffect(()=>{
        async function registerOrReset() {
            if (formToDisplay=="reset") {
                return;
            } else {        
            const URL = "http://localhost:4000/api/users/register";
            try {
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            email: email,
                            password: password
                        }
                    )
                })
                const result = await response.json()
                if (result.error){
                    setResponse(result.name)
                } else if (result.creds.email == email){
                    setToken(result.token)
                    setUserEmail(result.creds.email)
                    setUserId(result.creds.id)
                    setAccess(result.creds.user_group)
                    localStorage.setItem("token", result.token);   
                    localStorage.setItem("userId", result.creds.id)
                    localStorage.setItem("email", result.creds.email)
                } 
            } catch (error){
                console.error (error)
            }
        }
    }
        registerOrReset();
    },[])

    return (
        <></>
    )
}