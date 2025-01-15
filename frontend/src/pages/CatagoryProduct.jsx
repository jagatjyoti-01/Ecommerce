import React, { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import  productCatagory from '../helper/productCatagory'
import CategroyWiseProductDisplay from "../components/CategroyWiseProductDisplay";
import SummerApi from "../common";

function CatagoryProduct() {

  const [data,setdata]=useState([])
  const [loading,setloading]=useState(false)
  const [selectedCatagory,setselectedCatagory]=useState([])
  const [filtercatagory,setfiltercatagory]=useState([])
  const location=useLocation()
  const URLCategory=new URLSearchParams(location.search)
  const URLCategoryListinArray=URLCategory.get('catagory')

  console.log('URLCategoryListinArray',URLCategoryListinArray)

const fetchdata=async()=>{

  const responce=await fetch(SummerApi.filterProduct.url,{
    method:SummerApi.filterProduct.method,
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      category:filtercatagory
    })
  })
  const dataResponce=await responce.json()
  console.log('dataResponce',dataResponce)
  setdata(dataResponce?.data || []);
  console.log(dataResponce?.data)
    
}
  const hendelselectCatagory=(e)=>{
    const {name,value,checked}=e.target
    console.log("name,value,checked",name,value,checked)
    setselectedCatagory((prev)=>{
      return{
        ...prev,
        [value]:checked 
      }
    })
  }

  console.log('selectedCatagory',selectedCatagory)
  useEffect(()=>{
    fetchdata()
  },[filtercatagory])

  useEffect(()=>{
    const arrayOfCatagory=Object.keys(selectedCatagory).map((catagoryKeyName)=>{
      if(selectedCatagory[catagoryKeyName]){
        return catagoryKeyName
      }
      return null
    }).filter((el=>el!==null))
    setfiltercatagory(arrayOfCatagory)
    console.log('selectCatogoryitem are',arrayOfCatagory)

  },[selectedCatagory])

  
  
  const params = useParams();
  console.log("njjjk", params);

  //the params show me catagory name if i click camara  it show me camara it is due to (path: "product-category/:catagoryName", in the router folder the :catagoryName is work like a params)

  return (
    // <div>{params.catagoryName}</div>
    <div className="container mx-auto p-4 ">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* leftside  */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sortby */}
          <div>

            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
            <form action="" className='text-sm flex flex-col gap-2 py-2'>
              <div>
              <input type='radio' name=''   value={"asc"}/>
                <label htmlFor="">Price - Low to High</label>
              </div>
              <div>
              <input type='radio' name=''   value={"asc"}/>
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter By */}

          <div>
          <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
            {
              productCatagory.map((categoryName, index) => {
                return (
                   <div className='flex items-center gap-3'>
                                 <input type='checkbox' name={"category"} checked={selectedCatagory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={ hendelselectCatagory}  />
                                 <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                              </div>
                )
              })
            
            }
              
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>Search Results : </p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {/* {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              } */}
              {
                params.catagoryName && (
                  <CategroyWiseProductDisplay category={params.catagoryName} heading={"Recommended Product"} />
                )
              }
             </div>
            </div>
      </div>
    </div>
  );
}

export default CatagoryProduct;
