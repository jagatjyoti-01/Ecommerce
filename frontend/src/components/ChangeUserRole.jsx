import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummerApi from '../common';
import { toast } from 'react-toastify';


function ChangeUserRole({name,email,role,onClose,userid,callfun
}) {
    const[userRole,setUserRole]=useState(role)
    console.log("role " , role)
    console.log("userrole",userRole)
   
    const handelOnChange=(e)=>{
        setUserRole(e.target.value)
        console.log(e.target.value)

    }
    const updateUserRole= async()=>{
    const fetchResponse=await fetch(SummerApi.updateUser.url,{
        method:SummerApi.updateUser.method,
        credentials:'include',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            userid : userid,
                role : userRole
                
        })
        

    })
    //console.log("update role is ",role)

    const responseData=await  fetchResponse.json()
    console.log(responseData)
    if(responseData.success){   
        toast.success(responseData.message)
        onClose()
        callfun()
    }
    console.log("role updatae",responseData)

    }
  return (
    <div className=' fixed top-0 left-0 right-0 bottom-0  w-full h-full z-10 border flex justify-center items-center bg-slate-200 bg-opacity-50 '>
        <div className=' mx-auto bg-white shadow-md  p-4 w-full max-w-sm  '>
            
                <button className='block ml-auto' onClick={onClose}>
                    <IoCloseSharp/>
                    </button>
           
            <h1 className='pb-4 text-lg font-medium'>Change user Role</h1>
        <p>Name:{name}</p>
        <p>Email: {email}</p>
       <div className='flex items-center justify-between my-4'> <p>Role:</p>
        <select className='mt-4 border px-4 py-1' value={userRole}  onChange={handelOnChange}>
            {
                Object.values(ROLE).map((el)=>{
                    return(
                        <option value={el} key={el}>{el}</option>
                    )
                        
                    
                })
            }
        </select></div>
        <button className='w-fit mx-auto block  px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-full ' onClick={updateUserRole}>Changee Role</button>
        </div>
        
    </div>
  )
}

export default ChangeUserRole