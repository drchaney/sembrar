import { Featured, Login, Cart } from "./"

export default function Category({navHover, setNavHover, setToken, token, userId, setUserId, userEmail, setUserEmail }){ 
    
    const handleMouseOver = (event) => {
        setNavHover("")
    }
    return (
        navHover=="account"?<div onMouseLeave={handleMouseOver} className="account-menu"><Login setToken={setToken} token={token} setNavHover={setNavHover} setUserId={setUserId} userEmail={userEmail} setUserEmail={setUserEmail}/></div>:
        navHover=="cart"?<div onMouseLeave={handleMouseOver} className="cart-menu"><Cart token={token} userId={userId} navHover={navHover} setNavHover={setNavHover} /></div>:
        <>
            <div className="video-over" onMouseLeave={handleMouseOver}>
                <h1 className="cat-tag">{navHover}</h1>
                <h2 className="sub-header container">featured products:</h2>
                <div className="featured-products"><Featured navHover={navHover} setNavHover={setNavHover} token={token}/></div>
            </div>
        </>
    )
}
