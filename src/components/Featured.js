import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import star from "../assets/star.png"

export default function Featured({navHover, setNavHover}){ 
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function getFeaturedByCategory() {
            const category = navHover.replace(' ', '%20')
            const URL = "http://localhost:4000/api/products/featured/" + category.toLowerCase();
            try {
                const response = await fetch(URL)
                const results = await response.json();
                if (results.length == 0){
                    return;
                }
                let randomIndex = Math.floor(Math.random() * results.length);
                let newResults = []
                    for (let i = 0; i < 3; i++){
                        newResults.push(results[randomIndex])
                        randomIndex = randomIndex + 1;
                        if (randomIndex == results.length){
                            randomIndex = 0;   
                        }
                    }
                setCategories(newResults)
            } catch (error) {
                console.error(error)
            }
        }
        getFeaturedByCategory();
    },[navHover])

    const handleMouseClick = (event) => {
        setNavHover("")
    }

    return (
        <>
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {   
                        categories.map((category) => {
                            return(
                                <div className="col" key={category.id}>
                                    <Link to={`/item/${category.id}`} onClick={handleMouseClick} className="product-links">
                                        <div 
                                            className="feat-card card card-cover h-100 overflow-hidden text-bg-dark rounded-2"
                                            style = {{ backgroundImage: `url(${category.photo_urls[0]})`}}>
                                            
                                            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                                <h3 className="feat-tag mt-5 mb-4 display-6 fw-bold">{category.product_name}</h3>
                                            </div>
                                            <ul className="d-flex list-unstyled mt-auto">
                                            <li className="feat-tag d-flex align-items-center me-2"><img className="star" src={star} alt="rating out of 5 stars"/>{category.avg_rating}</li>
                                                {
                                                    category.tag_names.map((tag, index) => {
                                                        return(
                                                            <li className="ms-2 me-auto feat-tag" key={tag+index}>{tag}</li>
                                                        )
                                                    })
                                            
                                                }
                                            <li className="feat-tag d-flex align-items-center me-2">${category.price}</li>
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
