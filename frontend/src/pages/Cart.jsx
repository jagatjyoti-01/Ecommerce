import { React, useEffect, useState, useContext } from "react";
import SummerApi from "../common";
import Context from "../context";

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
      credentials : 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false)
    const responseData = await response.json();
    console.log('Fetched data:', responseData);

    if (responseData.success) {
      setData(responseData.data);
     
    }
    console.log('data is ',responseData.data)
  };
  // const handleLoading = async () => {
  //   await fetchData();
  // };

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
          {loading ? (
            loadingCart.map((item, index) => (
              <div
                key={item + "add to cart loading"}
                className="w-full bg-slate-200 h-32  my-1 border-slate-200 animate-pulse rounded"
              ></div>
            ))
          ) : (
           data.map((product,index)=>{
            return(
              <div
            key={product?._id + "add to cart loading"}
            className="w-full bg-white h-32  my-1 border-slate-200  rounded grid grid-cols-[128px,1fr]">
            <div className="w-32 h-32 bg-slate-200 ">
              <img src={product?.productId?.productImage[0]} alt="" className="w-full h-full object-scale-down mix-blend-multiply"/>
            </div>
            <div className="p-4"> 
              <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
            </div>
          </div>
            )
            
           })
          )}
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
