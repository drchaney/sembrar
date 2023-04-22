import { useState, useEffect } from "react";
import { useParams } from "react-router";
import star from "../assets/star.png"

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

    return(
        <div>
            {
                reviews?.map((review) => {
                    return(
                        <div key={review.id}>
                            <p className="review-string-1">
                                <span className="first-name">{review.first_name} </span>
                                from <span className="city-state">{review.city}, {review.state} </span>
                                rates: {review.rating}<img src={star} alt="star" className="align-text-top star"/></p>
                            <p className="review-string-2"> "{review.review}" </p>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}
