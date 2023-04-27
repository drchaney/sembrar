import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./cart.css"

export default function Cart({token, userId, setNavHover}){ 
    const [cart, setCart] = useState([])

    const handleMouseExitClick = () => {
        setNavHover("")
    }

    useEffect(()=>{
        if (token){
            async function getUserCart() {
                const URL = "http://localhost:4000/api/orders/cart/" + userId;
                try {
                const bearer = 'Bearer ' + token;
                const response = await fetch(URL, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    }
                })
                const result = await response.json()
                console.log(result)
                setCart(result)
                } catch (error) {
                    console.error(error)
                }
            }
            getUserCart();

        } else {
            async function getGuestCart() {
                const URL = "http://localhost:4000/api/orders/guest-cart"
                const savedBasket = JSON.parse(localStorage.getItem("cart"))
                let resultsArray = []                
                try {
                    for (let i = 0; i<savedBasket.length; i++){
                        const response = await fetch(URL, {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ product_id: savedBasket[i]["itemId"] })
                        })
                        const result = await response.json()
                        result[0].qty = savedBasket[i]["qty"]
                        resultsArray.push(result[0])
                    }
                    setCart(resultsArray)
                } catch (error) {
                    console.error(error)
                }
            }
            getGuestCart();
        }
    },[])

    return(
        cart.length>0?
            <div className="container cart-container">
                <div className="login-popup-wrapper"> <div className="close-button"><i className="green-text bi bi-x-square" onClick={handleMouseExitClick}></i></div>
                {
                    cart.length==1?<h1 className="cart-qty">{cart.length} item in your basket</h1>
                    : <h1 className="cart-qty">{cart.length} items in your basket</h1>
                }
                
                {  
                    cart.map((item, index) => {
                        return(
                            <div key={index} className="cart-item-card">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <img src={item.url} alt={item.product_name} className="img-fluid rounded cart-img"/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body text-center">
                                            <h5 className="card-title text-start">{item.product_name}</h5>
                                            <div className="row">
                                                <div className="col">${item.price} each</div>
                                                <div className="col">{item.qty}</div>
                                                <div className="col">${item.qty * item.price} subtotal</div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
                </div>
                <div className="text-end">total price :{cart.reduce((total, item)=>total+(item.price*item.qty),0)}</div>
                <Link to="/Checkout" className="btn btn-success login-button my-3">Checkout</Link>
            </div>
        : null
    )
}