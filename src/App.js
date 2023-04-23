import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Navbar, Menu, Products, Home, Item, Footer, Cart } from "./components/"
import "./App.css"

export default function App() {
    const [navHover, setNavHover] = useState('')
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [cartId, setCartId] = useState('')
    
    useEffect(()=>{
        let savedToken = localStorage.getItem("token")
        let savedUser = localStorage.getItem("user")
        if (savedToken) {
            setToken(savedToken)
        }
        if (savedUser) {
            setEmail(savedUser)
        }
    },[])

    return (
        <>
            <Navbar setNavHover={setNavHover}/>
            <Menu navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token} setEmail={setEmail} email={email}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="products/:category" element={<Products/>}/>
                <Route path="/item/:itemId" element={<Item/>}/>
                <Route path="/cart/" element={<Cart cartId={cartId}/>}/>
            </Routes>
            <Footer/>
        </>
    )
}