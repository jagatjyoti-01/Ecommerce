import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { ImGrin, ImSearch } from "react-icons/im";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummerApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const [menudisplay,setmenudisplay]=useState(false)
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  //console.log("user header", user)

// here the context use for countAddProduct present in add to cart product (app.js featchUserAddtoCart)
  const context=useContext(Context)
  //console.log('header add to cart count',context)

  const hendelLogout = async () => {
    const featchData = await fetch(SummerApi.logout_user.url, {
      method: SummerApi.logout_user.method,
      credentials: 'include',


    })
    const data = await featchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if (data.err) {
      toast.error(data.message)
    }
  }
  return (
    <header className=' h-16 shadow-md bg-white fixed w-full z-40'>
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className=''>
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full '>
          <input type="text" placeholder='Search product here  ' className='w-full outline-none pl-4' />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center  justify-center rounded-r-full text-white'>
            <ImSearch />
          </div>
        </div>

        <div className='flex gap-4 justify-center'>
          <div className=' cursor-pointer relative group justify-center'>
            {
              user?._id && (
                <div className='text-3xl 'onClick={()=>{setmenudisplay(prev=>!prev)}}>
              {
                user?.profilepic ? (
                  <img src={user?.profilepic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (<FaRegUserCircle />)
              }
            </div>
              )
            }
            {
              menudisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                <nav>
                  {
                    user?.role === ROLE.ADMIN && (<Link to={"admin-penal/all-product"} className='whitespace-nowrap hidden md:block hover:bg-slate-100'>Admin penal</Link>
                    )
                  }
                </nav>
    
                </div>
              )
            }

           

          </div>
          <Link to={"/Cart"} className='text-2xl  relative'>
            <span><FaShoppingCart /></span>
            {
              user?._id && (
                <div className=' flex bg-red-600 text-white w-5 h-5 rounded-full p-1 items-center justify-center absolute -top-2 -right-3  '>
                <p className='text-sm'>{context?.countProduct}</p>
              </div>
              )
            }
          
          </Link>
          <div>
            {
              user?._id ? (
                <button onClick={hendelLogout} className='bg-red-600 text-white rounded-full hover:bg-red-700  px-3 py-1'>Logout</button>
              ) : (
                <Link to={"/Login"} className='bg-red-600 text-white rounded-full hover:bg-red-700  px-3 py-1'>login</Link>

              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
