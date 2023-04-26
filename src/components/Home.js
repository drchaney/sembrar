import { useState, useEffect } from "react"
import { Item } from "./"
import "./body.css"
import mainlogo from "../assets/SEMBRAR.png"
import seed1 from "../assets/seed1.png"
import seed2 from "../assets/seed2.png"
import seed3 from "../assets/seed3.png"

export default function Home({token}){    
    const [story, setStory] = useState([])
    const [product, setProduct] = useState("")

    useEffect(()=>{
        async function getStoryArticle() {
            const URL = "http://localhost:4000/api/admin/story";
            try {
                const response = await fetch(URL)
                const results = await response.json();
                setStory(results)
            } catch (error) {
                console.error(error)
            }
        }
    getStoryArticle();
    },[])

    useEffect(()=>{
        async function getFeaturedProductIds() {
            const URL = "http://localhost:4000/api/products/featuredIDs";
            try {
                const response = await fetch(URL)
                const results = await response.json();
                const randomProduct =  Math.floor(Math.random() * results.length)
                setProduct(randomProduct)
            } catch (error) {
                console.error(error)
            }
        }
        getFeaturedProductIds();
    },[])

    return (
        <>
            <video src="https://static.videezy.com/system/resources/previews/000/036/873/original/plant_watering6.mp4" playsInline autoPlay muted loop ></video>
            <div className="main-section container text-center"><img src={mainlogo} alt="big logo"/></div>
    
            <div className="container text-center">
                <h1>Sembrar</h1>
                <h4>English: <i>To Sow</i></h4>
                <div className="container-story">
                    <div className="row">
                        <div className="col-9">
                            <img src={seed3} alt="plant in dirt"/>
                        </div>
                        <div className="col-3">
                            <p> </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                        {
                            story?.map((blurb) => {
                                return(
                                    <div className="story-article" key={blurb.id}>
                                        <h2 className="cat-tag text-start">{blurb.title}</h2>
                                        <p>{blurb.body}</p>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="col-3">
                            <img src={seed2} alt="plants in containers"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <img src={seed1} alt="plants in containers"/>
                        </div>
                    </div>
                </div>
            {
                product?
                    <>
                        <h2 className="cat-tag text-start">Featured Product:</h2>
                        <Item id={product} token={token}/>
                    </>:null
            }
            </div>
        </>
    )
}