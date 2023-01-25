import util from "./util"

const wsy = (socket)=>{

  const on = (event, fn)=>{
    if (event === "open" ){
      socket.onopen = ()=>{
        console.log("socket open")
        fn(socket)
      }
    } 
    if (event === "message") {
      socket.onmessage = (e)=>{
        const res = util().dj(e.data)
        console.log(res)
        fn(res)
      }
    }
    if (event === "close"){
      console.log("socket close")
      socket.onclose = () => {
        console.log("socket close")
        fn()
      }
    } 
  }


  return {
    on
  }
  
}

export default wsy