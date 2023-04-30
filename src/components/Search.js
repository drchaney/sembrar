import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Featured, Header, Item } from "./"
import star from "../assets/star.png"
import "./products.css"

export default function Search () {
    const {searchTerm} = useParams();
    const [products, setProducts] = useState([])
    const [qty, setQty] = useState("1")
    const category = "search"
    const filteredProducts = products.filter(product => productMatches(product, searchTerm));
    const productsToDisplay = searchTerm.length ? filteredProducts : products;

    function productMatches(product, text){
        const searchCriteria = [product.short_desc, product.long_desc, product.product_name]
        for (let i=0; i<searchCriteria.length; i++){
            if (searchCriteria[i].toLowerCase().includes(text.toLowerCase())){
                return true;
            }
        }
    }


    useEffect(()=>{
        async function getAllProducts() {
            const URL = "http://localhost:4000/api/products"
            try {
                const response = await fetch(URL)
                const results = await response.json();
                setProducts(results)
            } catch (error) {
                console.error(error)
            }
        }
        getAllProducts();
    },[])
    
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

    return(
        <>
            <Header category={category}/>
                <div className="container text-center">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {   
                            productsToDisplay==0?
                            <>
                                <h2 className="m-5">Sorry, no matches for <span className="green-text">{searchTerm}</span></h2>
                            </>:
                            productsToDisplay.map((product, index) => {
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