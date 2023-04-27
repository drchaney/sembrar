import { Cart } from "./"

export default function Checkout() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Cart/>
                </div>
                <div className="col">
                    <div className="container"> 
                        <div className="row">
                            <div className="col">
                            Enter Promo Code:
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <form>
                                    <input type="text"></input>
                                    <button type="submit" className="btn btn-success">APPLY</button>
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
    )
}