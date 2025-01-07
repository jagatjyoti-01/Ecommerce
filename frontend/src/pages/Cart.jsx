import { React, useEffect, useState,useContext } from "react";
import SummerApi from "../common";
import Context from "../context";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context=useContext(Context)
  const loadingCart=new Array(context.countProduct).fill(0)
  console.log("loadingCart",loadingCart)


  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummerApi.addtoCartProductView.url, {
      method: SummerApi.addtoCartProductView.method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //setLoading(false)
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };
  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
   // setLoading(true);
    handleLoading();
    //setLoading(false);
  }, []);
  return (
    <div className="mx-auto container">
      <div className=" text-center text-lg py-3">
        {data.length === 0 && !loading && <div>no avll data</div>}
      </div>
      <div>
        {/* VIEW  PRODUCT */}
        <div className="h-full max-w-3xl">
            
          { loading ? (
            loadingCart.map((item,index)=>(
                <div key={item + 'add to cart loading'} className="w-full bg-slate-200 h-32  my-1 border-slate-200 animate-pulse rounded"></div>
              
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
