import { useState, useEffect } from "react";
import { useParams } from "react-router";
import greenStar from "../assets/greenstar.png"

export default function Reviews({id}){
    const {itemId} = useParams();
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        async function getReviewsByProductId() {
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
        getReviewsByProductId();
    },[])

    function StarRating({reviewScore}){
        const score = Math.floor(reviewScore);
        let stars = []
        for (let i=0; i<score; i++){
            stars.push(<img key={i} src={greenStar} alt="star" className="star align-text-top"/>)
        }
        return [stars]
    }

    return(
        <div className="container"> 
            <div className="row review-list-container">
                <div className="col review-list">
                    {
                        reviews?.map((review) => {
                            return(
                                <div key={review.id}> 
                                    <div className="review-string-1">
                                        <div className="circle">{review.first_name[0]}</div><span className="first-name">{review.first_name} | </span>
                                        <span className="city-state">{review.city}, {review.state} | </span>
                                        {review.rating}/5 - <StarRating reviewScore={review.rating}/>
                                        <p className="review-string-2"> "{review.review}"</p>
                                    </div>
                                    <hr/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
