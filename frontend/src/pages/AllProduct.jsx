import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummerApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

function AllProduct() {
  const [openUploadProduct,setopenUploadProduct]=useState(false)
  const[allProduct,setAllProduct]=useState([])

  const fetchAllProduct=async()=>{
    const response =await fetch(SummerApi.getallProduct.url)  //by defult the method is get and  the response is json` so no need to nessary to write
    const dataResponse=await response.json()
    console.log("my get all product",dataResponse)
    setAllProduct(dataResponse?.data)


  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
    <div className='bg-white py-2 px-4 flex justify-between items-center'>
      <h2 className='font-bold text-lg'>All product</h2>
      <button className='border-2 rounded-full py-2 px-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all' onClick={()=>setopenUploadProduct(true)}>Upload product</button>
    </div>

    {/*......... get all product  from database and display it here */}
          <div className='flex flex-wrap items-center gap-6 py-4 ps-8'>
            {
              allProduct.map((product,index)=>{
                return(

                  <AdminProductCard product={product} key={index+"product"} fetchAllProduct={fetchAllProduct}/>
                  
                )
              })
            }
            
          
          </div>
    



{/* ...........uploadProduct compont............ */}

{
  openUploadProduct && (<UploadProduct onclose={()=>setopenUploadProduct(false)} fetchAllProduct={fetchAllProduct}  />)
}

    
    </div>
  )
}

export default AllProduct