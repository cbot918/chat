import React from 'react'

function Ws(props) {

  const ws = React.useRef(null)

  React.useEffect(()=>{
    console.log(props.socket)
    ws.current = props.socket
    console.log(ws.current)
    ws.current.onopen = ()=>{
      console.log("socket open")
      ws.current.send('{"ch":"h","msg":"fromclient"}')
    }
  },[])
  
  return (
    <div>Ws</div>
  )
}

export default Ws