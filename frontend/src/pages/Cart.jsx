import { React, useEffect, useState, useContext } from "react";
import SummerApi from "../common";
import Context from "../context";
import displayCurrency from "../helper/displayCurrency";
import { MdDelete } from "react-icons/md";


function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.countProduct).fill(0);
  //console.log("loadingCart", loadingCart);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummerApi.addToCartViewProduct.url, {
      method: SummerApi.addToCartViewProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    const responseData = await response.json();
    console.log("Fetched data:", responseData);

    if (responseData.success) {
      setData(responseData.data);
    }
    console.log("data is ", responseData.data);
  };
  // const handleLoading = async () => {
  //   await fetchData();
  // };

  const increaseQty = async (id,qty) => {
    const responcese=await fetch(SummerApi.updateCartProduct.url, {
      method: SummerApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify({
          quantity: qty + 1,
         
        })
  })
  const responceData=await responcese.json()

  if(responceData.success){
    
    fetchData()
    
  }
}

const decreaseQty = async (id,qty) => {
  if(qty>=2){
    const responcese=await fetch(SummerApi.updateCartProduct.url, {
      method: SummerApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify({
          quantity: qty - 1,       
        })
  })
  const responceData=await responcese.json()
  
  if(responceData.success){  
    fetchData();
  }
}
}

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mx-auto container">
      <div className=" text-center text-lg py-3">
        {data.length === 0 && !loading && <div>no avll data</div>}
      </div>

      {/* VIEW  PRODUCT */}
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4 px-10">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((item, index) => (
                <div
                  key={item + "add to cart loading"}
                  className="w-full bg-slate-200 h-32  my-1 border-slate-200 animate-pulse rounded"
                ></div>
              ))
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "add to cart loading"}
                    className="w-full bg-white h-32  my-1 border-slate-200  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200 ">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="p-4 relative ">
                      <div className="absolute right-0 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded">
                      <MdDelete />

                      </div>

                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.catagory}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">{displayCurrency(product?.productId?.sellingPrice)}</p>
                        <p className="text-slate-600 font-semibold text-lg">{displayCurrency(product?.productId?.sellingPrice * product?.quantity) }</p>
                      </div>

                      <div className="flex gap-3 items-center mt-1">
                        <button className=" border border-red-600 text-red-600 hover:bg-red-600 hover:text-white  w-6 h-6 flex justify-center items-center rounded" onClick={()=>decreaseQty(product?._id,product?.quantity)}>
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded " onClick={()=>increaseQty(product?._id,product?.quantity)}>
                          +
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
        </div>
        {/*.... total product .... */}

        {/*.... summary .... */}

        <div className=" w-full mt-5 lg:mt-0 max-w-sm ">
          {loading ? (
            <div className="h-36 bg-slate-200 border-slate-200">total</div>
          ) : (
            <div className="h-36 bg-slate-200">t</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
