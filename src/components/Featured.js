import { useState, useEffect } from "react";

export default function Featured({navHover}){ 
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

    return (
        <>
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {   
                        categories.map((category) => {
                            return(
                                <div className="col" key={category.id}>
                                    <div 
                                        className="feat-card card card-cover h-100 overflow-hidden text-bg-dark rounded-2"
                                        style = {{ backgroundImage: `url(${category.photo_urls[0]})`}}>
                                        
                                        <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                            <h3 className="feat-tag mt-5 mb-4 display-6 fw-bold">{category.product_name}</h3>
                                        </div>
                                        <ul className="d-flex list-unstyled mt-auto">
                                            {
                                                category.tag_names.map((tag) => {
                                                    return(
                                                        <li className="ms-2 me-auto feat-tag" key={category.id + tag}>{tag}</li>
                                                    )
                                                })
                                            }
                                        <li className="feat-tag d-flex align-items-center me-2">${category.price}</li>
                                        </ul>
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
