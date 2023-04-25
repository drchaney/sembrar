import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { Navbar, Menu, Products, Home, Item, Footer, Cart } from "./components/"
import "./App.css"

export default function App() {
    const [navHover, setNavHover] = useState('')
    const [token, setToken] = useState('')
    const [cartId, setCartId] = useState('')
    
    useEffect(()=>{
        let savedToken = localStorage.getItem("token")
        if (savedToken) {
            setToken(savedToken)
        }
    },[])

    return (
        <>
            <Navbar setNavHover={setNavHover}/>
            <Menu navHover={navHover} setNavHover={setNavHover} setToken={setToken} token={token}/>
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