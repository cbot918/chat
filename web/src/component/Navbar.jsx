import {Link,Outlet } from "react-router-dom";
import {UserContext} from "../App"
import { useContext} from "react"
function Navbar(){
  
  const { state, dispatch } = useContext(UserContext)

  const renderList = () =>{
    console.log("renderList state: ",state)
    if (state){
      return (
        <div>
        <nav>
          <ul className="flex flex-row justify-between">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
  
        <hr />
  
        <Outlet />
      </div>
      )
    }
  }

  return (
    <div>
      {renderList()}
      <div>
        <Link to={state? "/":"signin"} />
      </div>
      
    </div>
    
  )
}

export default Navbar