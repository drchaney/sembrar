import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Navbar, Menu, Products, Home, Item, Footer, Cart, Checkout, Search } from "./components/"
import "./App.css"

export default function App() {
    const [navHover, setNavHover] = useState('')
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const [userEmail, setUserEmail] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    
       
    useEffect(()=>{
        const savedToken = localStorage.getItem("token")
        setUserEmail(localStorage.getItem("user"))

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
                setUserId(result.user_id)
                setToken(savedToken)
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
            <Navbar setNavHover={setNavHover} userId={userId} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
            <Menu navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} userId={userId} setUserId={setUserId} userEmail={userEmail} setUserEmail={setUserEmail}/>
            <Routes>
                <Route path="/" element={<Home token={token}/>}/>
                <Route path="products/:category" element={<Products/>}/>
                <Route path="/item/:itemId" element={<Item token={token} userId={userId}/>}/>
                <Route path="Cart/:userId" element={<Cart token={token} userId={userId} setNavHover={setNavHover}/>}/>
                <Route path="Cart/" element={<Cart token={token} userId={userId} navHover={navHover} setNavHover={setNavHover}/>}/>
                <Route path="Checkout/" element={<Checkout token={token} userId={userId} navHover={navHover} setNavHover={setNavHover}/>}/>
                <Route path="Search/:searchTerm" element={<Search searchTerm={searchTerm}/>}/>
            </Routes>
            <Footer/>
        </>
    )
}