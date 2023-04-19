import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png"
import "./navbar.css"

export default function Navbar({setNavHover}){    
    const [categories, setCategories] = useState([])

    const handleMouseOver = (event) => {
        setNavHover(event.target.innerText)
    }

    const handleMouseOut = (event) => {
        setNavHover("")
    }

    useEffect(()=>{
        async function getCategories() {
            const URL = "http://localhost:4000/api/products/category/";
            try {
                const response = await fetch(URL)
                const results = await response.json();
                setCategories(results)
            } catch (error) {
                console.error(error)
            }
        }
    getCategories();
    },[])

    return(
        <>
            <nav className="navbar sticky-top navvy-bar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={logo} alt="sembrar logo" className="navbar-image"/>Sembrar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li> </li>
                        </ul>
                            {
                                categories.map((category) => {
                                    return(
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" key={category.id}>
                                            <li className="nav-item">
                                                <a className="nav-link" href={category.category_name} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                                                {category.category_name} </a>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li><i className="bi bi-person-circle icon-spacer"></i></li>
                            <li><i className="bi bi-basket3 icon-spacer"></i></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="nav-box"></div>
        </>
    )
}