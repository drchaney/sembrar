import "./body.css"
import can from "../assets/watercan.jpg"

export default function Navbar(){  
    return (
        <>
            <video src="https://static.videezy.com/system/resources/previews/000/004/937/original/Frosty_Plant_4K_Living_Background.mp4" playsinline autoPlay muted loop ></video>
            <div className="video-over">
                <h1 className="">Hello, world!</h1>
                <img src={can} alt="watering can"/>
            </div>
        </>
    )
}