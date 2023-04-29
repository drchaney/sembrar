import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Tags, Reviews } from "./"
import "./item.css"
import greenStar from "../assets/greenstar.png"

export default function Item({id, token, userId }) {
    const {itemId} = useParams();
    const [product, setProduct] = useState([])
    const [qty, setQty] = useState(1)
    const [reviews, setReviews] = useState([])
    const [tab, setTab] = useState("Description")
    const [activePhoto, setActivePhoto] = useState("")

    useEffect(()=>{
        async function getProductById() {
            const item = itemId || id
            const URL = "http://localhost:4000/api/products/item/" + item;
            try {
                const response = await fetch(URL)
                const results = await response.json();
                const mainPhoto = results[0].photo_urls[0]
                setProduct(results)
                setActivePhoto(mainPhoto)
            } catch (error) {
                console.error(error)
            }
        }
        getProductById();
    },[itemId])

    const thumbHandler = (event) => {
        setActivePhoto(event.target.currentSrc)
    }

    const handleQty = (event) => {
        setQty(event.target.value);
        event.preventDefault();
    }

    const handleQtyUp = (event) => {
        const quantity = qty + 1;
        setQty(quantity)
    }

    const handleQtyDown = (event) => {
        const quantity = qty - 1;
        setQty(quantity)
    }

    useEffect(()=>{
        async function getReviewsById() {
            const item = itemId || id
            const URL = "http://localhost:4000/api/users/reviews/product/" + item;
            try {
                const response = await fetch(URL)
                const results = await response.json();
                setReviews(results)
            } catch (error) {
                console.error(error)
            }
        }
        getReviewsById();
    },[itemId])

    const tabHandler = (event) => {
        setTab(event.target.innerText);
    }

    async function handleAddToCart(event) {
        event.preventDefault();
        if (!token){
            let cart_line = {itemId, qty}
            let cart = JSON.parse(localStorage.getItem("cart"))
            if (!cart){
                cart = []
                localStorage.setItem('cart', JSON.stringify(cart));
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.push(cart_line) 
            localStorage.setItem('cart', JSON.stringify(cart));
        } 
        
        if (token){
            try {
                const URL = "http://localhost:4000/api/orders/add2cart"
                const bearer = 'Bearer ' + token;
                console.log(userId, itemId, qty)
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        product_id: itemId,
                        qty: qty
                        })
                    })
                const result = await response.json()
                console.log(result)
            } catch (error){
                console.error ("There was an error: ", error);
            }
        }
    }

    function StarRating({reviewScore}){
        const score = Math.floor(reviewScore);
        let stars = []
        for (let i=0; i<score; i++){
            stars.push(<img key={i} src={greenStar} alt="star" className="star align-text-top"/>)
        }
        return [stars]
    }

    return (
        <div className="">
            {
                product?.map((item) => {
                    return(
                        <div key={item.id} className="container">             
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb text-capitalize p-3 mb-2 bg-secondary-subtle text-emphasis-secondary">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item"><a href={`/Products/${item.category_name}`}>{item.category_name}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{item.product_name}</li>
                                </ol>
                            </nav>
                            <div className="item-frame">
                                <div className="row">
                                    <div className="col">
                                        <img src={activePhoto} className="rounded mx-auto d-block" alt={item.product_name}/>
                                    </div>
                                    <div className="col text-start">
                                        <h1>{item.product_name}</h1>
                                        <div>
                                            {
                                                item.tag_names.map((tag, index) => {return(<span key={tag + index + item.id} className="badge text-bg-success me-1">{tag}</span>)})
                                            }
                                        </div>
                                        <div>{item.short_desc}</div>
                                        <div>{item.avg_rating}<StarRating reviewScore={item.avg_rating}/>
                                            <span className="badge text-bg-secondary me-2 ms-2"> {reviews.length} </span> 
                                            <a href="#" className="review-link">Write a review</a>
                                        </div>
                                        <h2 className="my-3">${item.price}</h2>
                                        <hr/>
                                        <div id="qty-input">
                                            <form className="input-group" onSubmit={handleAddToCart}>
                                                <button className="btn btn-secondary" type="button" onClick={handleQtyDown}>-</button>
                                                <input type="text" className="form-control d-inline-flex focus-ring py-1 px-2 text-decoration-none border" onChange={handleQty} value={qty}/>
                                                <button className="btn btn-secondary" type="button" onClick={handleQtyUp}>+</button>
                                                <button className="btn btn-success" type="submit">Add to Cart</button>
                                            </form>
                                        </div>
                                            {
                                                item.qoh>0?<div>In Stock</div>:<div>Out of Stock</div>
                                            }
                                        <hr></hr>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                            {
                                                tab==="Description"?
                                                    <p className="nav-link active">Description</p>:
                                                    <p className="nav-link" onClick={tabHandler}>Description</p>
                                            }
                                            </li>
                                            <li className="nav-item">
                                            {
                                                tab==="Pics"?
                                                <p className="nav-link active">Pics</p>:
                                                <p className="nav-link" onClick={tabHandler}>Pics</p>
                                            }
                                            </li>
                                            <li className="nav-item">
                                            {
                                                tab==="Reviews"?
                                                <p className="nav-link active">Reviews</p>:
                                                <p className="nav-link" onClick={tabHandler}>Reviews</p>
                                            }
                                            </li>
                                        </ul>
                                        
                                        {
                                            tab==="Description" ? <div className="tab-box">{item.long_desc}</div> : null
                                        }
                                        {
                                            tab==="Pics"?
                                                item.photo_urls.map((pic, index) => {return(<img key={pic + index + item.id} src={pic} alt={item.product_name} onClick={thumbHandler} className="thumby rounded img-fluid"/>)})
                                            :null
                                        }
                                        {
                                            tab==="Reviews"?
                                            <div>
                                            <Reviews id={item.id}/>
                                            </div>:
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                            <h2 className="container" >Similar to {item.product_name} because they are also {item.tag_names[0]}:</h2>
                            <Tags tag={item.tag_names[0]}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

                            