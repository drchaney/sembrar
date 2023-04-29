import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Header, Item } from "./"
import star from "../assets/star.png"
import "./products.css"

export default function Products() {
    const {category} = useParams();
    const [products, setProducts] = useState([])
    const [qty, setQty] = useState("1")

    useEffect(()=>{
        async function getProductsByCategory() {
            const URL = "http://localhost:4000/api/products/category/" + category.toLowerCase();
            try {
                const response = await fetch(URL)
                const results = await response.json();
                if (results.length == 0){
                    return;
                }
                setProducts(results)
            } catch (error) {
                console.error(error)
            }
        }
        getProductsByCategory();
    },[category])
    
    const handleQty = (event) => {
        setQty(event.target.value);
        event.preventDefault();
    }

    async function handleSubmit(event) {
        try {
            // const URL = "http://localhost:4000/api/users/login"
            // const response = await fetch(URL, {
            //     method: "POST",
            //     ContentType: "application/jason",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: email,
            //         password: password
            //     })
            console.log("click")
        } catch (error){
            console.error ("There was an error: ", error);
        }
    }

    // useEffect(()=>{
    //     async function getSalesArticle() {
    //         const URL = "http://localhost:4000/api/admin/sale";
    //         try {
    //             const response = await fetch(URL)
    //             const results = await response.json();
    //             for (let i=0; i<results.length; i++){
    //                 if (results[i].isactive){
    //                     setSale(results[i])
    //                     if (results[i].end_date){
    //                         const sqlDate = results[i].end_date;
    //                         const dateObj = DateTime.fromISO(sqlDate);
    //                         const formattedDate = dateObj.toFormat('LL-dd-yy')
    //                         setSalesExpirationDate(formattedDate)
    //                     }
    //                     return;
    //                 }
    //             }
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    // getSalesArticle();
    // },[])

    
    return(
        <>
            <Header category={category}/>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {   
                            products.map((product, index) => {
                                return(
                                    <div className="col" key={index + product.id + index}>
                                        <Link to={`/item/${product.id}`} className="product-links">
                                            <div 
                                                className="product-card card card-cover h-100 overflow-hidden text-bg-dark"
                                                style = {{ backgroundImage: `url(${product.photo_urls[0]})`}}>

                                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                                    <h3 className="product-tag">{product.product_name}</h3>
                                                </div>
                                                <ul className="d-flex list-unstyled mt-auto">
                                                    {
                                                        product.tag_names.map((tag, index) => {
                                                            return(
                                                                <li className="m-2 product-tag" key={product.id + tag + index + tag}>{tag}</li>
                                                            )
                                                        })
                                                    }
                                                    <li className="m-2 product-tag"><img className="star" src={star} alt="rating out of 5 stars"/>{product.avg_rating}</li>
                                                </ul>
                                                <div className="card-footer">
                                                    <div className="container add-to-cart">
                                                    <div className="price-tag">${product.price}</div>
                                                        <form className="input-group" onSubmit={handleSubmit}>
                                                            <button id="cart-button-left" className="btn btn-secondary" type="button">-</button>
                                                            <input type="text" className="form-control"  onChange={handleQty} value={qty}/>
                                                            <button className="btn btn-secondary" type="button">+</button>
                                                            <button id="cart-button-right" className="btn btn-success" type="button">Add to Cart</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        </>
    )
}