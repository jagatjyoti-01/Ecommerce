import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa"
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import ROLE from '../common/role';


function AdminPenal() {
  const user = useSelector(state => state?.user?.user)
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.role !==ROLE.ADMIN){
      navigate('/')

    }
  })

  return (
    <div className='min-h-[calc(100vh-110px)] md:flex border hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='flex justify-center items-center h-32  flex-col'>
        <div className='text-5xl  curser-pointer flex justify-center '>
              {
                user?.profilepic ? (
                  <img src={user?.profilepic} className='w-20 h-20 rounded-full' alt={user?.name} />
                ) : (<FaRegUserCircle />)
              }
            </div>
            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p>{user?.role}</p>
        </div>
        {/* ------------Navigatin------------- */}
        <nav className='grid'>
           <Link to={"all-user"} className='px-2 py-1 hover:bg-slate-100'> All user</Link>
           <Link to={"all-product"} className='px-2 py-1 hover:bg-slate-100'>Product</Link>
        </nav>
      </aside>
      <main className='h-full w-full p-2 '>
      <Outlet />
      </main>
    </div>
  )
}

export default AdminPenal