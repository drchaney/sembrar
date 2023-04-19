import { OutdoorGarden, IndoorPlants, Veggies, Herbs, Supplies } from "./"
import "./body.css"

export default function Navbar({navHover}){  
    return (
        <>
            <video src="https://static.videezy.com/system/resources/previews/000/004/937/original/Frosty_Plant_4K_Living_Background.mp4" playsInline autoPlay muted loop ></video>
            {
                navHover=="outdoor garden"?<OutdoorGarden navHover={navHover}/>:
                navHover=="indoor plants"?<IndoorPlants navHover={navHover}/>:
                navHover=="fruits and vegetables"?<Veggies navHover={navHover}/>:
                navHover=="herbs"?<Herbs navHover={navHover}/>:
                navHover=="supplies"?<Supplies navHover={navHover}/>:null
            }
        </>
    )
}