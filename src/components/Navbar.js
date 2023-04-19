import { useState, useEffect } from "react";
import logo from "../assets/logo.png"
import "./navbar.css"
import { DateTime } from "luxon";

export default function Navbar({setNavHover}){    
    const [categories, setCategories] = useState([])
    const [sale, setSale] = useState([])
    const [salesExpirationDate, setSalesExpirationDate] = useState("")

    const handleMouseOver = (event) => {
        setNavHover(event.target.innerText)
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

    useEffect(()=>{
        async function getSalesArticle() {
            const URL = "http://localhost:4000/api/admin/sale";
            try {
                const response = await fetch(URL)
                const results = await response.json();
                for (let i=0; i<results.length; i++){
                    if (results[i].isactive){
                        setSale(results[i])
                        if (results[i].end_date){
                            const sqlDate = results[i].end_date;
                            const dateObj = DateTime.fromISO(sqlDate);
                            const formattedDate = dateObj.toFormat('LL-dd-yy')
                            setSalesExpirationDate(formattedDate)
                        }
                        return;
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }
    getSalesArticle();
    },[])

    return(
        <>  
           {
                sale?
                    <>
                        <div className="text-center sales-banner"><h5>{sale.title} - {sale.body}
                            { salesExpirationDate? <span> Hurry! Sale expires: {salesExpirationDate}</span>:null }
                        </h5></div>
                    </>:null
            }
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
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" key={category.id} onMouseOver={handleMouseOver}>
                                            <li className="nav-item">
                                                <a className="nav-link" href={category.category_name}>{category.category_name} </a>
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
        </>
    )
}