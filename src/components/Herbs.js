import can from "../assets/watercan.jpg"

export default function Herbs({navHover, setNavHover}){ 

    const handleMouseOver = (event) => {
        setNavHover("")
    }
    return (
        <>
            <div className="video-over">
                <h1 className="">{navHover}</h1>
                <img src={can} alt="watering can"/>
                <div className="invisible-border" onMouseOver={handleMouseOver}></div>
            </div>
        </>
    )
}
