import React, { useEffect, useState } from "react";
import SummerApi from "../common";
function Cart() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true)
    const responce = await fetch(SummerApi.addtoCartProductView.url, {
      method: SummerApi.addtoCartProductView.method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //setLoading(false)
    const responceData = await responce.json();
    if (responceData.success) {
      setdata(responceData.data);
      console.log("cart data", responceData.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mx-auto container">
      <div className="text-center text-lg my-3">
        {
        data.length ===0 & !loading && 
         <p className="bg-white">no data</p>
        }
      </div>
      {/* <div>
        {
            loading?(
             <div className="w-full  bg-slate-200 my-1 border border-slate-200">

             </div>
            ):(
              <div>ghj</div>
            )
        }
      </div> */}
    </div>
  );
}

export default Cart;
