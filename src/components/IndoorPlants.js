import { Featured } from "./"
import can from "../assets/watercan.jpg"

export default function IndoorPlants({navHover, setNavHover}){ 

    const handleMouseOver = (event) => {
        setNavHover("")
    }
    return (
        <>
            <div className="video-over">
                <h1 className="">{navHover}</h1>
                <h2 className="sub-header container">featured products:</h2>
                <div className="featured-products"><Featured navHover={navHover}/></div>
                <div className="invisible-border" onMouseOver={handleMouseOver}></div>
            </div>
            
        </>
    )
}
