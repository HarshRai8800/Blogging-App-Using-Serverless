import React from 'react'
import Input from '../components/Input'
import { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Signup() {
  const navigate = useNavigate()
  const [data,setdata] = useState({
   username:"",
   email:"",
   password:""
  })
  console.log(data.username)
async function sigUp (){
  console.log(data)
   const res = await axios.post("https://backend.harshrai8800.workers.dev/api/v1/users/signup",{
    name:data.username,
    email:data.email,
    password:data.password
   })
   console.log(res)
   if(res.data.msg=="done"){
    alert("signUp completed succesfully")
    localStorage.setItem("token",res.data.token)
    navigate("/blog")
   }
}
  return (
    <div className="grid grid-cols-2 h-screen w-screen gap-4">
  
    <div className="flex flex-col gap-2 items-center justify-center">
    <div>  
      <div className='text-3xl font-bold'>
        SignIn into your account
      </div>
      <div className='text-base font-extralight'>
       Already have an account<button onClick={()=>navigate("/")} className='text-base font-normal hover:font-normal hover:underline'>SignIn</button>
      </div>
    </div>

    <Input 
        type="text"  
        placeholder="Username" 
        label="Enter Username" 
        func={setdata} 
        id={1}
        feildName={"username"}
      />
      <Input 
        type="text"  
        placeholder="Email" 
        label="Enter email" 
func={setdata}
feildName={"email"}
        id={2}
      />
      <Input 
        type="password"  
        placeholder="Password" 
        label="Enter password" 
        func={setdata} 
        id={3}
        feildName={"password"}
      />
        <button
        onClick={()=>sigUp()}
        className="bg-black mt-4 hover:bg-zinc-700 h-14 text-white font-bold py-2 px-4 border w-2/3 border-blue-700 rounded">
      Button
      </button>


    
    </div>
  

    <div className='bg-slate-200 flex flex-col justify-center items-center gap-4 align-middle'>
      <div className=' w-2/3 font-semibold text-3xl'>
        "The customer support i received was exceptional. The support team went above and went to address my concerns."
      </div>
      <div className='capitalize w-2/3 font-medium text-xl'>
        Jules Winfeild
      </div>
      <div className='capitalize w-2/3 font-medium text-xl'>
        CEO, Acne Inc
      </div>
    </div>
  </div>
  
  )
}

export default Signup