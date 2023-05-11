import { Link } from "react-router-dom"
import users from "../assets/users.png"
import products from "../assets/products.png"
import comms from "../assets/comms.png"
import orders from "../assets/orders.png"

export default function Admin({token}){
  return(
    <div className="container admin-menu">
      <div className="row">
        <div className="col">
          <h1>Admin - Site Settings</h1>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-3">
          <div><Link to="/AdminUsers"><img src={users} alt="admin option - users"></img></Link></div>
        </div>
        <div className="col-9">
          <ul>
            <li>View all users</li>
            <li>Disable users (also removes reviews)</li>
            <li>Unlock users</li>
            <li>Force password reset on next login</li>
          </ul>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-3">
          <div><Link to="/AdminProducts"><img src={products} alt="admin option - products"></img></Link></div>
        </div>
        <div className="col-9">
          <ul>
            <li>Add products</li>
            <li>Disable products</li>
            <li>Edit products</li>
          </ul>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-3">
          <div><Link to="/AdminComms"><img src={comms} alt="admin option - comms"></img></Link></div>
        </div>
        <div className="col-9">
        <ul>
            <li>View all Comm Plans</li>
            <li>Add articles</li>
            <li>Add Promo Codes</li>
            <li>Edit Stories</li>
          </ul>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-3">
          <div><Link to="/AdminOrders"><img src={orders} alt="admin option - orders"></img></Link></div>
        </div>
        <div className="col-9">
        <ul>
            <li>View all pending orders</li>
            <li>Completed Orders report</li>
            <li>Edit orders</li>
          </ul>
        </div>
      </div>
    </div>
  )
}