import { useEffect, useState } from "react"
import "./cart.css"

export default function Cart({token, userId}){ 
    const [cart, setCart] = useState([])
    
    // If not logged in...
        // Create a "Cart" by using localStorage only
        // Add lins to localStorage cart
        // Checkout with that cart
    //Create a cart_line with cart_id, product_id, qty
    
    useEffect(()=>{
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
        getUserCart()
    },[])

    return(
        <div className="container cart-container">
            <h1 className="cart-qty">{cart.length} item(s) in your basket</h1>
            {  
                cart.map((item) => {
                    return(
                        <div className="cart-item-card">
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
    )
}