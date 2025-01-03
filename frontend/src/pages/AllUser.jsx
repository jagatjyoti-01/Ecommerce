import React, { useEffect, useState } from 'react'
import SummerApi from '../common'
import { toast } from 'react-toastify'
import moment from "moment"
import { FaPen } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

function AllUser() {
  const [alluser,setallUser]=useState([])
  const[closeBar,setCloseBar]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
    email:'',
    name:'',
    role:'',
    _id:''
  })
  const featchAllUsers=async()=>{
  const featchdata = await fetch(SummerApi.allUser.url,{
    method:SummerApi.allUser.method,
    credentials:'include'
  })
  const dataResponse=await featchdata.json()
  if(dataResponse.success){
    setallUser(dataResponse.data)
  }
if(dataResponse.error){
toast.error(dataResponse.message)
}

  // console.log(dataResponse)
}
  useEffect(()=>{
   featchAllUsers()
  },[])
  return (
    <div className=' bg-white pb-4'>
      <table className='w-full  usertable '>
        <thead>
        <tr className='bg-black text-white'>
        <th>sr</th>
        <th>Name</th>
        <th>Email</th>
        <th>role</th>
        <th>creted date</th>
        <th>Action</th>
        </tr>
        </thead>
        <tbody className='pb-4 bg-white'>
          {
              alluser.map((el,index)=>{
            return(
              <tr className='text-xs '>
                <td>{index+1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el.role}</td>
                <td>{moment(el.createAt).format('LL')}</td> 
                   {/* here i instal the  "moment "" library  for convert the proper date format */}
                <td ><button className='bg-green-100  rounded-full p-2 cruser-pointer hover:bg-green-500 hover:text-white' 
                onClick={()=>{setCloseBar(true)
                  setUpdateUserDetails(el)
                }}><FaPen/></button></td>
              </tr>
            )
              
              })
          }
        </tbody>
      </table>

      {/*............... after clicking the pen button open this ChangeUserRole  and actual namme and details pass by propes.............. */}
      {
        closeBar && (<ChangeUserRole 
          onClose={()=>setCloseBar(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userid={updateUserDetails._id}
          callfun={featchAllUsers}
        />)
      }
      
    </div>
  )
}

export default AllUser