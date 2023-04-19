import { OutdoorGarden, IndoorPlants, Veggies, Herbs, Supplies } from "./"
import "./body.css"
import mainlogo from "../assets/SEMBRAR.png"

export default function Body({navHover, setNavHover}){    

    return (
        <>
            {
                navHover=="outdoor garden"?<OutdoorGarden navHover={navHover} setNavHover={setNavHover}/>:
                navHover=="indoor plants"?<IndoorPlants navHover={navHover} setNavHover={setNavHover}/>:
                navHover=="fruits and vegetables"?<Veggies navHover={navHover} setNavHover={setNavHover}/>:
                navHover=="herbs"?<Herbs navHover={navHover} setNavHover={setNavHover}/>:
                navHover=="supplies"?<Supplies navHover={navHover} setNavHover={setNavHover}/>:null
            }
            <video src="https://static.videezy.com/system/resources/previews/000/036/873/original/plant_watering6.mp4" playsInline autoPlay muted loop ></video>
            <div className="main-section container text-center"><img src={mainlogo} alt="big logo"/></div>
        </>
    )
}