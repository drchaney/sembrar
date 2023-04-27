import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./cart.css"

export default function Cart({token, userId, setNavHover}){ 
    const [cart, setCart] = useState([])

    const handleQtyUp = (event) => {
        const quantity = qty + 1;
        setQty(quantity)
    }

    const handleQtyDown = (event) => {
        const quantity = qty - 1;
        setQty(quantity)
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
                <div className="login-popup-wrapper">
                {
                    cart.length==1?<h1 className="cart-qty">{cart.length} item in your basket</h1>
                    : <h1 className="cart-qty">{cart.length} items in your basket</h1>
                }
                <div className="container">
                    <div className="row">
                        <div className="col-3"> </div>
                        <div className="col-3">$ / ea</div>
                        <div className="col-3">qty</div>
                        <div className="col-3">sum</div>
                    </div>
                </div>
                
                {  
                    cart.map((item, index) => {
                        return(
                            <div key={index} className="cart-item-card my-1 position-relative">
                                <div className="">
                                    <h4 className="text-center">{item.product_name}</h4>
                                </div>
                                <div className="position-absolute top-0 end-0"><i class="bi bi-x"></i></div>
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <img src={item.url} alt={item.product_name} className="img-fluid rounded cart-img py-1"/>
                                    </div>
                                    
                                    <div className="col-3">
                                        <h6>${item.price}</h6>
                                    </div>
                                    <div className="col-3">
                                        <div className="row"><i class="bi bi-plus-circle" onClick={handleQtyUp}></i></div>
                                        <div className="row"><input className="qty-box text-center" type="text" value={item.qty}/></div>
                                        <div className="row"><i class="bi bi-dash-circle" onClick={handleQtyDown}></i></div>
                                    </div>
                                    <div className="col-3">
                                        <h6>${item.qty * item.price}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
                </div>
                <div className="text-end"><h5>Total: ${cart.reduce((total, item)=>total+(item.price*item.qty),0)}</h5></div>
                <Link to="/Checkout" className="btn btn-success login-button my-3">Checkout</Link>
            </div>
        : null
    )
}