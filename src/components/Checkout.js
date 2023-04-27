import { Cart } from "./"

export default function Checkout() {
    return (
        <div className="left-image">
            <div className="container">
                <div className="row">
                    <div className="col cart-summary m-3">
                        <Cart/>
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
                                    <form>
                                        <input type="text"></input>
                                        <button type="submit" className="btn btn-success m-2">APPLY</button>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                Shipping Cost
                                </div>
                                <div className="col">
                                $5.95
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                Sales Tax
                                </div>
                                <div className="col">
                                $0.00
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                Total
                                </div>
                                <div className="col">
                                $0.00
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