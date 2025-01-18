import { useFetch } from "../api/useFetch"
import useMutation from "../api/useMutation"
import { Input } from "../components/Input/Input"
import TodoCard from "../components/Todo/TodoCard"


const Home = () => {
    const {data} =useFetch("todo","getAll")
   const {mutation,isLoading,error} =useMutation()
  return (
    <div className="flex flex-col">
        <input className="px-4 py-2 w-1/2 self-center my-4" placeholder="search todo" />  
        
        <div className="grid grid-cols-3 gap-4">
   {
data?.map((dta)=>{
    return <TodoCard {...dta}   />
})
   }
  </div>
  </div>

  )
}

export default Home