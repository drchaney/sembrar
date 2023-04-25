import { useState, useEffect } from "react";

export default function Register({email, password, formToDisplay, setResponse, setToken}){

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
                } else if (result.user.email == email){
                    setResponse("success")
                    setToken(result.token)
                    localStorage.setItem("token", result.token);   
                    localStorage.setItem("user", result.user.email);
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