export default function Admin({token}){
  return(
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Admin - Site Settings</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div><h3>Users</h3></div>
          <div>View users</div>
        </div>
        <div className="col">
          <div><h3>Products</h3></div>
          <div>Add Product</div>
        </div>
        <div className="col">
          <div><h3>Comms</h3></div>
          <div>View Comms</div>
        </div>
        <div className="col">
          <div><h3>Orders</h3></div>
        </div>
      </div>
    </div>
  )
}