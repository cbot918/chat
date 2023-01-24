const util = ()=>{
  const dj = (x) =>{
    return JSON.parse(x.replaceAll("\\", "").slice(1,-2))
  }

  const logP = (x) =>{
    x.split("").forEach((e,index)=>console.log(`${index}: ${e}`))
  }
  return {
    dj, 
    logP
  }
}



// target = target.replace("\\", "")