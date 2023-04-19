import can from "../assets/watercan.jpg"

export default function Veggies({navHover}){  
    return (
        <>
            <div className="video-over">
                <h1 className="">{navHover}</h1>
                <img src={can} alt="watering can"/>
            </div>
        </>
    )
}
