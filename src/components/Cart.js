import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./cart.css"

export default function Cart({token, userId, navHover, setNavHover, setSubtotal }){ 
    const [cart, setCart] = useState([])
    const [cartChange, setCartChange] = useState([])
    
    function handleQtyUp(id, qty) {
        if (token){
            const newQty = qty + 1;
            if (id){
                
                async function reduceItem() {
                    const URL = "http://localhost:4000/api/orders/EditCart"
                    try {
                        const bearer = 'Bearer ' + token;
                        const response = await fetch(URL, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': bearer
                            },
                            body: JSON.stringify({
                                user_id: userId,
                                product_id: id,
                                qty: newQty
                            })
                        })
                        const result = await response.json()
                        setCartChange(result)
                    } catch (error) {
                        console.error(error)
                    }
                }
                reduceItem();
            } else {
                return;
            }
        } else {
            const savedBasket = JSON.parse(localStorage.getItem("cart"))
            const newBasket = []
            for (let i = 0; i<savedBasket.length; i++){
                let itemId = savedBasket[i].itemId
                let qty = savedBasket[i].qty;
                if (savedBasket[i].itemId == id){
                    qty = qty + 1;
                }
                newBasket.push({itemId, qty})
            }
            localStorage.setItem('cart', JSON.stringify(newBasket));
            setCartChange(newBasket)
        }
    }  

    function handleQtyDown(id, qty) {
        const newQty = qty - 1;
        if (token){
            if (id){
                
                async function reduceItem() {
                    const URL = "http://localhost:4000/api/orders/EditCart"
                    try {
                        const bearer = 'Bearer ' + token;
                        const response = await fetch(URL, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': bearer
                            },
                            body: JSON.stringify({
                                user_id: userId,
                                product_id: id,
                                qty: newQty
                            })
                        })
                        const result = await response.json()
                        setCartChange(result)
                    } catch (error) {
                        console.error(error)
                    }
                }
                reduceItem();
            } else {
                return;
            }
        } else {
            const savedBasket = JSON.parse(localStorage.getItem("cart"))
            const newBasket = []
            for (let i = 0; i<savedBasket.length; i++){
                let itemId = savedBasket[i].itemId
                let qty = savedBasket[i].qty;
                if (savedBasket[i].itemId == id){
                    qty = qty - 1;
                }
                newBasket.push({itemId, qty})
            }
            localStorage.setItem('cart', JSON.stringify(newBasket));
            setCartChange(newBasket)
        }
    }  

    function removeFromCart(id) {
        if (token){
            if (id){
                async function removeItem() {
                    const URL = "http://localhost:4000/api/orders/EditCart/RemoveLine"
                    try {
                        const bearer = 'Bearer ' + token;
                        const response = await fetch(URL, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': bearer
                            },
                            body: JSON.stringify({
                                user_id: userId,
                                product_id: id
                            })
                        })
                        const result = await response.json()
                        setCartChange(result)
                    } catch (error) {
                        console.error(error)
                    }
                }
                removeItem();
            } else {
                return;
            }
        } else {
            const savedBasket = JSON.parse(localStorage.getItem("cart"))
            const newBasket = []
            for (let i = 0; i<savedBasket.length; i++){
                let itemId = savedBasket[i].itemId
                let qty = savedBasket[i].qty;
                if (savedBasket[i].itemId == id){
                    continue;
                }
                newBasket.push({itemId, qty})
            }
            localStorage.setItem('cart', JSON.stringify(newBasket));
            setCartChange(newBasket)
        }
    }  

    useEffect(()=>{
        async function emptyGuestCart(itemId, qty) {
            try {
                const URL = "http://localhost:4000/api/orders/add2cart"
                const bearer = 'Bearer ' + token;
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        product_id: itemId,
                        qty: qty
                        })
                    })
                const result = await response.json()
                setCartChange(result)
            } catch (error){
                console.error ("There was an error: ", error);
            }
        }

        if (token){
            if (localStorage.getItem("cart") != null){
                let guestCart = JSON.parse(localStorage.getItem("cart"))
                if (guestCart.length > 0){
                    for (let i=0; i<guestCart.length; i++){
                        let {itemId, qty} = guestCart[i]
                        emptyGuestCart(itemId, qty)
                    }
                localStorage.removeItem("cart");
                }
            }
        }
    },[token])

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
                    setCart(result)
                    let sumPrice = 0;
                    for (let i = 0; i<result.length; i++){
                        sumPrice += result[i].price * result[i].qty
                    }
                    setSubtotal(sumPrice)

                } catch (error) {
                    console.error(error)
                }
            }
            getUserCart();
        }
    },[cartChange])

    useEffect(()=>{
        if (!token){
            async function getGuestCart() {
                const URL = "http://localhost:4000/api/orders/guest-cart"
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
                        result[0].product_id = savedBasket[i]["itemId"]
                        resultsArray.push(result[0])
                    }
                    setCart(resultsArray)
                    let sumPrice = 0;
                    for (let i = 0; i<resultsArray.length; i++){
                        sumPrice += resultsArray[i].price * resultsArray[i].qty
                    }
                    setSubtotal(sumPrice)
                } catch (error) {
                    console.error(error)
                }
            }
            const savedBasket = JSON.parse(localStorage.getItem("cart"))
            if (savedBasket){
                getGuestCart();
            }
        }
    },[cartChange])

    return(
        cart.length>0?
            <div className="container cart-container">
                <div className="login-popup-wrapper">
                {
                    cart.length==1?<h3 className="cart-qty m-4 mt-3">You have {cart.length} item in your basket</h3>
                    : <h3 className="cart-qty m-4 mt-3">You have {cart.length} items in your basket</h3>
                }
                <div className="container">
                    <div className="row">
                        <div className="cart-border col-3"> </div>
                        <div className="cart-border col-3">$ / ea</div>
                        <div className="cart-border col-3">qty</div>
                        <div className="cart-border col-3">sum</div>
                    </div>
                </div>
                
                {  
                    cart.map((item, index) => {
                        return(
                            <div key={index} className="cart-item-card my-1 position-relative">
                                <div className="">
                                    <h4 className="item-name-header ps-1">{item.product_name}</h4>
                                </div>
                                <div className="position-absolute top-0 end-0"><i onClick={() => removeFromCart(item.product_id)} className="bi bi-x"></i></div>
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <img src={item.url} alt={item.product_name} className="img-fluid rounded cart-img m-1"/>
                                    </div>
                                    
                                    <div className="col-3">
                                        <h6>${item.price}</h6>
                                    </div>
                                    <div className="col-3">
                                        <div className="row"><i onClick={() => handleQtyUp(item.product_id, item.qty)}className="bi bi-plus-circle"></i></div>
                                        <div className="row"><div className="qty-box text-center">{item.qty}</div></div>
                                        <div className="row"><i onClick={() => handleQtyDown(item.product_id, item.qty)}className="bi bi-dash-circle"></i></div>
                                    </div>
                                    <div className="col-3">
                                        <h6>${(item.qty * item.price).toFixed(2)}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                } 
                </div>
                <div className="text-end">
                    <h5>Total: ${cart.reduce((total, item)=>total+(item.price*item.qty),0).toFixed(2)}</h5></div>
                {
                    navHover=="cart"?<Link to="/Checkout" className="btn btn-success login-button my-3">Checkout</Link>:null
                }
            </div>
        : null
    )
}