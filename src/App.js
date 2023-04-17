import { useState, useEffect } from "react"
import { getAllProductsAPI } from "./components/api"
import "./App.css"

export default function App() {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        async function getAllProducts(){
            const response = await getAllProductsAPI()
            setProducts(response)
        }
        getAllProducts();
      },[]);

    return(
        <>
            <h1>Sembrar</h1>
            <div className="container text-center">
                <div className="row row-cols-4">
                    {
                        products.map((product)=>{
                            return(
                                <div class="col">
                                    <div className="card custom-product-card">
                                        <img src={product.photo_id} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.short_desc}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{product.category_name}</li>
                                            <li className="list-group-item">{product.product_tag}</li>
                                            <li className="list-group-item">{product.price}</li>
                                        </ul>
                                        <div className="card-body">
                                            <button className="btn btn-secondary" type="submit"><i className="bi bi-bookmark-plus"></i> Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        </>
    )
}