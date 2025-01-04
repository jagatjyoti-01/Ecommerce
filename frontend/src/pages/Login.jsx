import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SummerApi from '../common';
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Context from '../context';

const Login = () => {
  const [setPassword, setShowPassword] = useState(false)
  const [data,setdata]=useState({
    email:"",
    password:""
  })

  const navigate=useNavigate()

const {fetchUserDetails,featchUserAddtoCart}=useContext(Context)
//console.log("generalContext",generalContext.fetchUserDetails())

  const handleOnchange=(e)=>{
    const {name,value}=e.target
    setdata((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  console.log(data)


  const hendelSubmit=async(e) =>{
   e.preventDefault()
   try{
   const dataResponse=await fetch(SummerApi.signIn.url,{
    credentials:'include',
    method:SummerApi.signIn.method,
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data)
   })
   console.log(SummerApi.signIn.url)

   const dataApi=await dataResponse.json()
   if (dataApi.success) {
    toast.success(dataApi.message);
    console.log(dataApi.message);
    navigate('/')
    fetchUserDetails()
    featchUserAddtoCart()
   
  } else if (dataApi.error) {
    toast.error(dataApi.message);
    console.log(dataApi.error);
  }
  }catch(error){
    console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
  }
   
  }
  return (
    <section id='login'>
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-2 w-full max-w-sm mx-auto">
          <div className="mx-auto w-20 h-20 ">
            <div >
            <img src={loginIcons} alt="login icon" />
            </div>
            {/* <form>
              <label >
              <div className='bg-slate-200 text-xs  bg-opacity-80 pb-4  pt-2 cursor-pointer text-center absolute bottom-0 w-full '>
              Upload img
            </div>
              </label>
              <input type="file" />
            </form> */}
           
          </div>
          <form onSubmit={hendelSubmit} className='flex pt-6 flex-col gap-2'>
          <div className=''>
            <label> Email :</label>
            <div className='bg-slate-100 p-2' >
              <input type="email" 
              name='email'
              value={data.value}
              onChange={handleOnchange}
              placeholder='enter email' 
              className='w-full h-full outline-none bg-transparent' />
            </div>
          </div>
          <div>
            <label> password :</label>
            <div className='bg-slate-100 p-2 flex' >
              <input type={setPassword ? "text" : "password"}
              name='password'
              value={data.password}
              onChange={handleOnchange}
               placeholder='enter password' 
               className='w-full h-full outline-none bg-transparent' />
              <div className='cruser-pointer text-xl  ' onClick={() => { setShowPassword((prev) => !prev) }}>
                <span>{setPassword ? (<FaEyeSlash />) : (<BiSolidShow />)}


                </span>
              </div>

            </div>
            <Link to={"/Forgot-Password"} className='flex flex-row-reverse hover:underline hover:text-red-500'>Forgot password?</Link>
          </div>
          <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block my-4 hover:bg-red-700'  type='submit' >Login</button>
          </form>
          <p>Don't have an account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700'>Sign-up</Link></p>  
        </div>
        
      </div>
    </section>
  )
}

export default Login
