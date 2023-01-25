import * as React from "react";
import { useState,useEffect,createContext,useReducer,useContext } from "react";
import { BrowserRouter,Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import Navbar from "./component/Navbar"
import Login from "./component/view/Login"
import Regist from "./component/view/Regist"
import Home from "./component/view/Home"
import Ws from "./component/lib/Ws"
import Chat from "./component/view/chat/Chat"
import { reducer, initialState } from "./reducer/useReducer";

export const UserContext = createContext()

function Routing(props){
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  const user = 0;


  const ws = React.useRef(null);
  useEffect(()=>{
    // ws.current = props.props.socket 
    // ws.current.onopen = () => console.log("ws opened");
    // ws.current.onclose = () => console.log("ws closed");
    // socket.onopen = ()=>{
    //   console.log("socket open")
    //   socket.send('{"ch":"h","msg":"fromclient"}')
    // }
    if (user){
      console.log("app.jsx state: ", user)
      dispatch({type: "USER", payload: user})
    } else {
      navigate('/chat')
    }
  },[])

  return (
    <Routes>
      <Route index            element={<Home />} />
      <Route path="about"     element={<About />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login"     element={<Login />}/>
      <Route path="regist"    element={<Regist />}/>
      {/* <Route path="ws"        element={<Ws socket={props.socket}/>}/> */}
      <Route path="chat"      element={<Chat socket={props.socket}/>}/>
      <Route path="*"         element={<NoMatch />} />
    </Routes>
  );
}

export default function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState)

  const socket = new WebSocket("ws://localhost:4545/ws")
  // console.log(socket)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing socket={socket}/>
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