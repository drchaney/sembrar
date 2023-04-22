import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Tags, Reviews } from "./"
import "./item.css"
import greenStar from "../assets/greenstar.png"

export default function Item({id}) {
    const {itemId} = useParams();
    const [product, setProduct] = useState([])
    const [qty, setQty] = useState("1")
    
    useEffect(()=>{
        async function getProductById() {
            const item = itemId || id
            const URL = "http://localhost:4000/api/products/item/" + item;
            try {
                const response = await fetch(URL)
                const results = await response.json();
                setProduct(results)
            } catch (error) {
                console.error(error)
            }
        }
        getProductById();
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

    function StarRating({reviewScore}){
        const score = Math.floor(reviewScore);
        let stars = []
        for (let i=0; i<score; i++){
            stars.push(<img src={greenStar} alt="star"/>)
        }
    return [stars]

    }

    return (
        <div>Disable if "isactive" is false
            {
                product?.map((item) => {
                    return(
                        <>             
                            <nav key={item.id} aria-label="breadcrumb">
                                <ol className="breadcrumb text-capitalize p-3 mb-2 bg-secondary-subtle text-emphasis-secondary">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item"><a href={`/Products/${item.category_name}`}>{item.category_name}</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">{item.product_name}</li>
                                </ol>
                            </nav>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <img src={item.photo_urls[0]} class="rounded mx-auto d-block" alt={item.product_name}/>
                                    </div>
                                    <div className="col  text-start">
                                        <h1>{item.product_name}</h1>
                                        <div>
                                            {
                                                item.tag_names.map((tag) => {return(<span class="badge text-bg-success me-1">{tag}</span>)})
                                            }
                                        </div>
                                        <div>{item.short_desc}</div>
                                        <div><StarRating reviewScore={item.avg_rating}/>
                                        Stars (*****) / badge (count of reviews) - button "Write a review" - update review qry to ignore inactive users</div>
                                        <div>Price -- sale?</div>
                                        <hr></hr>
                                        <div>+ qty - add to cart</div>
                                        <div>In Stock / Out of Stock</div>
                                        <hr></hr>
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link active" aria-current="page" href="#">Description</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Pics</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#">Reviews</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}

// {
//                 product?.map((item) => {
//                     return(
//                         <div key={item.id}>
//                             <div className="container item-container">
//                                 <div className="row">
//                                     <div className="col"><h1>{item.product_name}</h1></div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col">
//                                         {
//                                             item.photo_urls.map((pic, index) => {
//                                                 return(
//                                                     <div key={index} className="container">
//                                                         <div className="row">
//                                                             <div className="col pic-preview-container">
//                                                                 <div className="pic-preview" style = {{ backgroundImage: `url(${pic})`}}></div>
//                                                             </div>
//                                                         </div><br/>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                     <div className="col"><img src={item.photo_urls[0]} alt="pic of {item.product_name}"/>
//                                         <div className="row">
//                                             <div className="col short-desc">{item.short_desc} <img className="star text-top" src={greenStar} alt="rating out of 5 stars"/>{item.avg_rating}</div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col">
//                                                 <div className="add-3-cart container">
//                                                     <div className="price-tag">${item.price}</div>
//                                                     <form className="input-group" onSubmit={handleSubmit}>
//                                                         <button id="cart-button-left" className="btn btn-secondary" type="button">-</button>
//                                                         <input type="text" className="form-control"  onChange={handleQty} value={qty}/>
//                                                         <button className="btn btn-secondary" type="button">+</button>
//                                                         <button id="cart-button-right" className="btn btn-success" type="button">Add to Cart</button>
//                                                     </form>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col long-desc">{item.long_desc}
                                    
//                                         <div className="row review-list-container">
//                                             <div className="col review-list">
//                                                 <Reviews id={item.id}/>
//                                             </div>
//                                         </div>
//                                         <div className="container text-center m-3">
//                                             <button className="btn btn-success" type="submit">Add / Edit Review</button>
//                                         </div>

//                                     </div>
//                                 </div>

//                             </div>
//                             <h2>Similar to {item.product_name} because they are also {item.tag_names[0]}:</h2>
//                             <Tags tag={item.tag_names[0]}/>
//                         </div>
//                     )
//                 })
//             }
//         </>
//     )
// }

                /* product?.map((item) => {
                    return(
                        <div key={item.id}>
                        <h1>Name: {item.product_name}</h1>
                            
                            <ul>
                                <li>Item ID: {item.id}</li>    
                                <li>Short Desc: {item.short_desc}</li>
                                <li>Long Desc: {item.long_desc}</li>
                                <li>Cat ID: {item.category_id}</li>
                                <li>Cat: {item.category_name}</li>
                                <li>Price: {item.price}</li>
                                {
                                    item.tag_names.map((tag, index) => {
                                        return(
                                            <li key={index}>Tag: {tag}</li>
                                        )
                                    })
                                }
                                {
                                    item.photo_urls.map((pic, index) => {
                                        return(
                                            <li key={index}>Pic URL: {pic}</li>
                                        )
                                    })
                                }
                                <li>Rating: {item.avg_rating}</li>

                            </ul>
                        </div>
                    )
                }) */
