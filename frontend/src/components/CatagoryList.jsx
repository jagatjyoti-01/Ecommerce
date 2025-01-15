import React, { useEffect, useState } from 'react'
import SummerApi from '../common'
import { Link } from 'react-router-dom'

function CatagoryList() {
    const[catagoryProduct,setcatagyProduct]=useState([])
    const [loader,setLoader]=useState(false)
    const catagoryLoading=new Array(13).fill(null)
    

    const featchCatagoryProduct=async()=>{
        setLoader(true)
        const response=await fetch(SummerApi.catagoryProduct.url)
        const dataResponse=await response.json()
        setLoader(false)
        setcatagyProduct(dataResponse.data)
    }
    useEffect(()=>{
        featchCatagoryProduct()
    },[])
  return (
    <div className='mx-auto p-4 container '>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrolbar-none'>
        {
            loader?(
                
                    catagoryLoading.map((el,index)=>{
                        return(
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 animate-pulse' key={"catagoryLoading"+index}></div>

                        )

                    })
                
            ) : (
                catagoryProduct.map((product,index)=>{
                    return(
                     <Link to={"/product-category/"+product?.catagory} className='cursor-pointer' key={product?.category}>
                     <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                         <img src={product?.productImage[0]} alt={product?.catagory} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                     </div>
                     <p className='text-center text-sm md:text-base capitalize'>{product?.catagory}</p>
                 </Link>
                    )
                 })
            )
            
        }
    </div>
    </div>
  )
}

export default CatagoryList