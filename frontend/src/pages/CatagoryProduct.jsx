import React from "react";
import { useParams } from "react-router-dom";
import  productCatagory from '../helper/productCatagory'

function CatagoryProduct() {
  
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
                                 <input type='checkbox' name={"category"} value={categoryName?.value} id={categoryName?.value}  />
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
             </div>
            </div>
      </div>
    </div>
  );
}

export default CatagoryProduct;
