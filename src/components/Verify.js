import {Login} from "./"


export default function Verify({token}){
  return(
    <>
      <div className="container text-center green-text">
        <h1>Checkout</h1>
        <hr/>
          {
            token?
              <h1>logged in</h1>
              :
              <div className="row text-start">
                <div className="col ms-5 verify-box-left">
                  <h3>Returning Customers:</h3>
                  <Login/>
                </div>
                <div className="col verify-box-right">
                  <h3>Guest Checkout:</h3>
                  <p>You can checkout without creating an account but will not be able to see account-specific details, promotions, and order history enjoyed by Sembrar members.</p>
                  <div className="row text-center">
                    <div className="col">
                      <button type="button" className="btn btn-success">Checkout As Guest</button>
                    </div>
                  </div>
                </div>
              </div>
          }
      </div>
    </>
  )
}