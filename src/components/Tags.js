import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import star from "../assets/star.png"

export default function Tags({tag}){
    const {urlTag} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function getProductsByTag() {
            const item = urlTag || tag
            const URL = "http://localhost:4000/api/products/tag/" + item;
            try {
                const response = await fetch(URL)
                const results = await response.json();
                let randomIndex = Math.floor(Math.random() * results.length);
                let newResults = []
                    for (let i = 0; i < 3; i++){
                        newResults.push(results[randomIndex])
                        randomIndex = randomIndex + 1;
                        if (randomIndex == results.length){
                            randomIndex = 0;   
                        }
                    }
                setProducts(newResults)
            } catch (error) {
                console.error(error)
            }
        }
        getProductsByTag();
    },[])

    return(
        <>
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {   
                        products?.map((product) => {
                            return(
                                <div className="col" key={product.id}>
                                    <Link to={`/item/${product.id}`} className="product-links">
                                        <div 
                                            className="feat-card card card-cover h-100 overflow-hidden text-bg-dark rounded-2"
                                            style = {{ backgroundImage: `url(${product.photo_urls[0]})`}}>
                                            
                                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                                <h3 className="feat-tag mt-5 mb-4 display-6 fw-bold">{product.product_name}</h3>
                                            </div>
                                            <ul className="d-flex list-unstyled mt-auto">
                                            <li className="feat-tag d-flex align-items-center me-2"><img className="star" src={star} alt="rating out of 5 stars"/>{product.avg_rating}</li>
                                                {
                                                    product.tag_names.map((tag) => {
                                                        return(
                                                            <li className="ms-2 me-auto feat-tag" key={product.id + tag}>{tag}</li>
                                                        )
                                                    })
                                            
                                                }
                                            <li className="feat-tag d-flex align-items-center me-2">${product.price}</li>
                                            </ul>
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