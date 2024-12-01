import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import NavBar from "../components\/NavBar"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Blog() {
const [state,setstate]=useState([])
const navigate = useNavigate()

useEffect(()=>{
const func = async()=>{
  const token = localStorage.getItem("token")
  console.log(token)
const {data:{res}} = await axios.get("https://backend.harshrai8800.workers.dev/api/v1/blog/all",{
  headers:{
    Authorization:`bearer ${token}`
  }
})
console.log(res)
if(res){
  console.log(state)
  setstate(res)
  console.log(state)
}
}
func()
},[])

 




  return (
   <div>
<NavBar />
<div className="flex flex-col gap-4 justify-center items-center mt-6 min-h-screen bg-gray-100">
    {state.length>0?state.map((data)=>{
console.log(data)
      return (
        <div key={data.id} onClick={()=>navigate(`/blog/${data.id}`)} className="w-full max-w-md p-4 bg-gray-100  border-gray-200 hover:shadow-2xl transition-shadow">
  <Cards 
  
    name={data.users.name} 
    title={data.title} 
    description={data.description} 
  />
</div>

      )
    }):<div>loading...</div>}     
        </div>

   </div>
  
        
      );
    };
    
 
    


  
export default Blog