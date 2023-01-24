const log = console.log



// const deJson = (...fns)=>{
//   return (input) =>{
//     return fns.reduce((v,fn)=>fn(v),input)
//   }
// }

let target = "{\"channel\":\"main\",\"message\":\"hihi\"}"

// deJson(
//   (x)=>x.replace("\\", "")
// )(target)

target = target.replace("\\", "")
log(target)

const result = JSON.parse(target)
log(typeof(result))
log(result)