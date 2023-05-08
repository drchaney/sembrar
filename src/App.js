import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Navbar, Menu, Products, Home, Item, Footer, Cart, Checkout, Search, Verify, Admin } from "./components/"
import "./App.css"

export default function App() {
    const [navHover, setNavHover] = useState('')
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [access, setAccess] = useState(1)
    
       
    useEffect(()=>{
        const savedToken = localStorage.getItem("token")
    
        async function verifyToken() {
            const URL = "http://localhost:4000/api/users/me"
            const bearer = 'Bearer ' + savedToken;
            try {
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    }
                })
                const result = await response.json()
                if (result.user_id>0){
                    setUserId(result.user_id)
                    setAccess(result.user_group)
                    setUserEmail(result.email)
                    setToken(savedToken)
                    localStorage.setItem("userId", result.user_id)
                    localStorage.setItem("email", result.email)
                } else {
                    console.log("invalid token")
                    localStorage.removeItem("token")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("email")
                }
            } catch (error){
                console.error (error)
            }
        }
        if (savedToken) {
            verifyToken()
        }
    },[])

    return (
        <>
            <Navbar access={access} setNavHover={setNavHover} userId={userId} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Menu setAccess={setAccess} navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} userId={userId} setUserId={setUserId} userEmail={userEmail} setUserEmail={setUserEmail}/>
            <Routes>
                <Route path="/" element={<Home token={token}/>}/>
                <Route path="products/:category" element={<Products/>}/>
                <Route path="/item/:itemId" element={<Item token={token} userId={userId}/>}/>
                <Route path="Cart/:userId" element={<Cart token={token} userId={userId} setNavHover={setNavHover}/>}/>
                <Route path="Cart/" element={<Cart token={token} userId={userId} navHover={navHover} setNavHover={setNavHover}/>}/>
                <Route path="Checkout/" element={<Checkout token={token} userId={userId} navHover={navHover} setNavHover={setNavHover}/>}/>
                <Route path="Search/:searchTerm" element={<Search searchTerm={searchTerm}/>}/>
                <Route path="Verify/" element={<Verify token={token}/>}/>
                <Route path="Admin/" element={<Admin token={token}/>}/>
            </Routes>
            <Footer/>
        </>
    )
}