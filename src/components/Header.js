import herbs from "../assets/herbs_header.png"
import og from "../assets/og_header.png"
import supplies from "../assets/supplies_header.png"
import indoor from "../assets/indoor_header.png"
import veggies from "../assets/veggies_header.png"
import misc from "../assets/results_header.png"

export default function Header({category}) {
    return(
        <>
            <div className="header-image">
            {
                category=="outdoor garden" ? <img src={og} alt="outdoor garden header"/>:
                category=="indoor plants" ? <img src={indoor} alt="indoor plants header"/>:
                category=="fruits and vegetables" ? <img src={veggies} alt="fruits and vegetables header"/>:
                category=="herbs" ? <img src={herbs} alt="herbs header"/>:
                category=="supplies" ? <img src={supplies} alt="supplies header"/>:<img src={misc} alt="supplies header"/>
            }
            </div>
        </>
    )
}