import { useEffect, useState } from "react"
import { Cart } from "./"

export default function Checkout({token, userId, navHover, setNavHover}) {
    const [subtotal, setSubtotal] = useState(0)
    const [shipping, setShipping] = useState(5.95)
    const [salesTax, setSalesTax] = useState(.085)
    const [total, setTotal] = useState(0)
    const [promoCode, setPromoCode] = useState("")
    const [message, setMessage] = useState("")
    const [discount, setDiscount] = useState(0)

    const handlePromoCode = (event) => {
        setPromoCode(event.target.value);
    }

    useEffect(()=>{
        setNavHover("")
        setTotal(subtotal+salesTax+shipping-(subtotal*discount))
    },[])

    async function checkPromoCode(event) {
        event.preventDefault();
        const URL = "http://localhost:4000/api/orders/promo"
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    code: promoCode
                })
            })
            const result = await response.json()
            console.log(result)
            if (result[0].discount){
                setDiscount(result[0].discount/100)
                setMessage("success")
            } else {
                setMessage("error")
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className="left-image">
            <div className="container">
                <div className="row">
                    <div className="col cart-summary m-3">
                        <Cart token={token} userId={userId} navHover={navHover} setNavHover={setNavHover} setSubtotal={setSubtotal}/>
                    </div>
                    <div className="col m-3">
                        <div className="container promo-summary p-3"> 
                            <div className="row">
                                <div className="col">
                                Enter Promo Code:
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={checkPromoCode}>
                                        <input type="text" value={promoCode} onChange={handlePromoCode}></input>
                                        <button type="submit" className="btn btn-success m-2">APPLY</button>
                                    </form>
                                    {message=="success"?<p>Success!</p>:
                                     message=="error"?<p>Not a valid code</p>:
                                     null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                Shipping Cost
                                </div>
                                <div className="col">
                                ${shipping.toFixed(2)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                Sales Tax
                                </div>
                                <div className="col">
                                ${(subtotal * salesTax).toFixed(2)}
                                </div>
                            </div>
                            {message=="success"?
                                <div className="row">
                                    <div className="col green-text">
                                        Promo code: {promoCode}
                                    </div>
                                    <div className="col green-text">
                                        $-{(subtotal * discount).toFixed(2)}
                                    </div>
                                </div>:null
                            }
                            <div className="row">
                                <div className="col">
                                Total
                                </div>
                                <div className="col">
                                ${(subtotal+salesTax+shipping-(subtotal*discount)).toFixed(2)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-success">CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}