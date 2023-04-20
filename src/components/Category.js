import { Featured, Login } from "./"

export default function Category({navHover, setNavHover, setToken, token, setEmail, email}){ 
    
    const handleMouseOver = (event) => {
        setNavHover("")
    }
    return (
        navHover=="account"?<div className="account-menu"><Login setToken={setToken} token={token} setEmail={setEmail} email={email}/></div>:
        navHover=="cart"?<div className="cart-menu"></div>:
        <>s
            <div className="video-over">
                <h1 className="cat-tag">{navHover}</h1>
                <h2 className="sub-header container">featured products:</h2>
                <div className="featured-products"><Featured navHover={navHover}/></div>
                <div className="invisible-border" onMouseOver={handleMouseOver}></div>
            </div>
            
        </>
    )
}
