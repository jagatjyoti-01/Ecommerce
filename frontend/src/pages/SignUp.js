import { useState } from 'react';
import React from 'react'
import loginIcons from '../assest/signin.gif'
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import convertImageToBase64 from '../helper/Imagetobase64'
import SummerApi from '../common';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function SignUp() {
  const [setPassword, setShowPassword] = useState(false)
  const [setConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilepic: ""
  })

  const navigate=useNavigate()  
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setdata((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })
    console.log("name is ",name)
  }
  console.log(data)

  const hendelSubmit = async(e) => {
    e.preventDefault()

    if(data.password===data.confirmPassword){
      console.log(SummerApi.signup.url)
      const dataResponce=await fetch(SummerApi.signup.url,{
        method: 'POST',
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify(data)
        
      })
      const dataApi=await dataResponce.json()
      if(dataApi.success){
        toast(dataApi.message)
        navigate("/login")
      }
      
        console.log("data",dataApi)
      
    }else{
      toast.message("check the password again")
      // console.log("check the password again")
      console.log("cpassis" ,data.confirmPassword)
    }

   
  }
  const handelUploadPic = async (e) => {
    const file = e.target.files[0]
    console.log(file)

    const imagee = await convertImageToBase64(file)
    console.log("image", imagee)

    setdata((prev) => {
      return {
        ...prev,
        profilepic: imagee
      }
    }
    )
  
}
return (
  <section id='SignUp'>
    <div className="mx-auto container p-4 ">
      <div className="bg-white p-2 w-full max-w-sm mx-auto">
        <div className="mx-auto w-20 h-20 relative overflow-hidden rounded-full">
          <div >
            <img src={data.profilepic || loginIcons} alt="login icon" />
          </div>
          <form>
            <label >
              <div className='bg-slate-200 text-xs  bg-opacity-80 pb-4  pt-2 cursor-pointer text-center absolute bottom-0 w-full  '>
                Upload img
              </div>
              <input type="file" className='hidden' onChange={handelUploadPic} />
            </label>

          </form>

        </div>
        <form onSubmit={handleOnchange} className='flex pt-6 flex-col gap-2 '>
          <div className=''>
            <label> Name :</label>
            <div className='bg-slate-100 p-2' >
              <input type="text"
                name='name'
                value={data.name}
                onChange={handleOnchange}
                required
                placeholder='enter name'
                className='w-full h-full outline-none bg-transparent' />
            </div>
          </div>
          <div className=''>
            <label> Email :</label>
            <div className='bg-slate-100 p-2' >
              <input type="email"
                name='email'
                value={data.email}
                onChange={handleOnchange}
                required
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
                required
                placeholder='enter password'
                className='w-full h-full outline-none bg-transparent' />
              <div className='cruser-pointer text-xl  ' onClick={() => { setShowPassword((prev) => !prev) }}>
                <span>{setPassword ? (<FaEyeSlash />) : (<BiSolidShow />)}
                </span>
              </div>

            </div>

          </div>
          <div>
            <label> confirm password :</label>
            <div className='bg-slate-100 p-2 flex' >
              <input type={setConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleOnchange}
                placeholder='enter password'
                className='w-full h-full outline-none bg-transparent' />
              <div className='cruser-pointer text-xl  ' onClick={() => { setShowConfirmPassword((prev) => !prev) }}>
                <span>{setConfirmPassword ? (<FaEyeSlash />) : (<BiSolidShow />)}


                </span>
              </div>

            </div>
          </div>
          <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block my-4 hover:bg-red-700'onClick={hendelSubmit} >Sign-up</button>
        </form>
        <p>Alredy have an account ? <Link to={"/Login"} className=' text-red-600 hover:text-red-700'>Login</Link></p>
      </div>

    </div>
  </section>
)
}

export default SignUp