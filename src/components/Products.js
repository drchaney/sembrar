import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "./"
import "./products.css"

export default function Products() {
    const {category} = useParams();
    const [products, setProducts] = useState([])
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
                        products.map((product) => {
                            return(
                                <div className="col" key={product.id}>
                                    <div 
                                        className="product-card card card-cover h-100 overflow-hidden text-bg-dark rounded-2"
                                        style = {{ backgroundImage: `url(${product.photo_urls[0]})`}}>
                                        
                                        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                            <h3 className="product-tag mt-5 mb-4">{product.product_name}</h3>
                                        </div>
                                        <ul className="d-flex list-unstyled mt-auto">
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
                                </div>
                            )
                        })
                    }
                </div>
            </div>
{/* 
            <div className="container text-center">
                <div className="row row-cols-4">
                    {
                        products.map((product)=>{
                            return(
                                <div className="col" key={product.id}>
                                    <div className="card custom-product-card">
                                        <img src={product.photo_id} className="card-img-top" alt={product.name}/>
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
            </div> */}
        </>
    )
}