export default function(){
  console.log('123123')
}

export function add(x,y){
  import(/* webpackChunkName:'print_inner' */'./print_inner')
    .then(({default:inner}) => console.log(inner))
    .catch(console.log)
  return x + y
}
export function sub(x,y){
  return x - y
}