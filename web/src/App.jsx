import * as React from "react";
import { useState,useEffect,createContext,useReducer,useContext } from "react";
import { BrowserRouter,Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import Navbar from "./component/Navbar"
import Login from "./component/view/Login"
import Regist from "./component/view/Regist"
import Home from "./component/view/Home"
import { reducer, initialState } from "./reducer/useReducer";

export const UserContext = createContext()

function Routing(){
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  const user = 0;
  useEffect(()=>{
    if (user){
      console.log("app.jsx state: ", user)
      dispatch({type: "USER", payload: user})
    } else {
      navigate('/login')
    }
  },[])

  return (
    <Routes>
      <Route index            element={<Home />} />
      <Route path="about"     element={<About />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login"     element={<Login />}/>
      <Route path="regist"    element={<Regist />}/>
      <Route path="*"         element={<NoMatch />} />
    </Routes>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}


function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}