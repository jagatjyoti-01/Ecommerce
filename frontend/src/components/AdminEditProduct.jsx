import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import productCatagory from "../helper/productCatagory";
import { IoCloudUpload } from "react-icons/io5";
import uploadImage from "../helper/uploadImage";
import DisplayFullimage from "./DisplayFullimage";
import { MdDelete } from "react-icons/md";
import SummerApi from "../common";
import { toast } from 'react-toastify';

function AdminEditProduct({onclose, productEdit,fetchAllProduct}) {
    const [fullscreenimage,setfullscreenimage]=useState('')
    const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
    //const [uploadProductImageInput, setuploadProductImageInput] = useState("");
    const [data, setData] = useState({
      ...productEdit,
      productName: productEdit?.productName,
      brandName:productEdit?.brandName,
      productImage: productEdit?.productImage || [],
      description: productEdit?.description,
      price: productEdit?.price,
      sellingPrice: productEdit?.sellingPrice,
    });
    const hendelOnChange = (e) => {
      const { name, value } = e.target;
      setData((prev)=>{
        return{
          ...prev,
          [name]:value
  
        }
      })
    };
  
    const hendelUpload = async (e) => {
      const file = e.target.files[0];
      //setuploadProductImageInput(file.name);
      console.log("file", file);
  
      const uploadImageCloudinary = await uploadImage(file);
  
      setData((prev) => {
        return {
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url],
        };
      });
      console.log("upload image ", uploadImageCloudinary);
      console.log("upload image ", uploadImageCloudinary.url);
      console.log(data.productImage);
  
    };
  
    const hendelDelete=async(index)=>{
      console.log("delete image index ",index)
  
      const newProductimg=[...data.productImage]
      newProductimg.splice(index,1)
  
      setData((prev) => {
        return {
          ...prev,
          productImage: [...newProductimg ],
        };
      })
  
    }
  
    const handelSubmit=async(e)=>{
      e.preventDefault()
      console.log("full data after form fill up",data)
  
      const response=await fetch(SummerApi.updateProduct.url,{
        method:"POST",
        credentials:'include',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
  
      })
  
      const responData=await response.json()
      if(responData.success){
        toast.success(responData?.message)
        onclose()
        fetchAllProduct()
      }
      if(responData.error){
        toast.error(responData?.message)
      }
        
  
    }

    

  return (
    
        <div className="bg-slate-200 bg-opacity-35 w-full h-full fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div className=" w-full bg-white max-w-2xl h-full max-h-[70%] p-4 rounded overflow-hidden">
        <div className=" flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit products</h2>
          <div
            className="ml-auto w-fit text-2xl hover:text-red-600 cursor-pointer"
            onClick={onclose}
          >
            <IoCloseSharp />
          </div>
        </div>

        <form
          action=""
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-40  "
          onSubmit={handelSubmit}
        >
          {/* .........if  the id name and and htmlfor of lebel is same then when you click the lebel it direct focus to input box  ....... */}
         <label htmlFor="ProductName">Product name :</label>
          <input
            type="text"
            id="ProductName"
            placeholder="enter product name"
            value={data.productName}
            name="productName"
            onChange={hendelOnChange}
            className="p-2 bg-slate-100  border rounded"
          />
 
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brand name"
            name="brandName"
            value={data.brandName}
            onChange={hendelOnChange}
            className="p-2 bg-slate-100  border rounded"
          />
          <label htmlFor="catagory" className="mt-3">
            catagory:
          </label>
          <select
            name="catagory"
            required
            onChange={hendelOnChange}
            value={data.catagory}
            className="p-2 bg-slate-100  border rounded "
          >
            <option value={""}>Select Catagory</option>
            {productCatagory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="catagory" className="mt-3">
            productImage:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <IoCloudUpload className="text-4xl" />
                <p className="text-sm">Upload product image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={hendelUpload}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex gap-2 items-center ">
                {data.productImage.map((el,index) => {
                  return (
                    <div className="relative group">
                      <img
                      key={el}
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className=" bg-slate-100 border p-2 pb-6"
                      
                      onClick={()=>{
                        setfullscreenimage(el)
                         setOpenFullScreenImage(true)

                      }}
                    />
                    <div className="absolute bottom-0 right-0  text-white bg-red-600 rounded-full p-1 hidden group-hover:block" onClick={()=>hendelDelete(index)}><MdDelete/></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-500 text-sm">*Please upload image</p>
            )}
          </div>

          <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='enter price' 
                value={data.price} 
                name='price'
                onChange={hendelOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='enter selling price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={hendelOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={hendelOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>
          <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700">
            Edit Product{" "}
          </button>
        </form>
      </div>
      {
        openFullScreenImage &&  <DisplayFullimage onclose={()=>setOpenFullScreenImage(false)} imageurl={fullscreenimage} />
      }
     
    </div>
    
  )
}

export default AdminEditProduct