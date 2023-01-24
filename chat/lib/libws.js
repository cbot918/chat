const log = console.log

const yws = (target)=>{
  const socket = new WebSocket (target)
  
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
        fn()
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