import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummerApi from "../common";

function SearchProduct() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const query = useLocation();
  //const query = new URLSearchParams(location.search).get('q')

  console.log("query", query.search);

  const fetchProducts = async () => {
    setloading(true);
    const responce = await fetch(SummerApi.searchProduct.url + query.search);
    const responcedata = await responce.json();
    setloading(false)
    setdata(responcedata.data);
    //here the api return a array of search result
     console.log('data', responcedata)  
  };
  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <div className="mx-auto container p-4 ">
      {loading && <p className="text-lg text-center">loading...</p>}
      <p>search Result : {data.length}</p>
      {
        data.length ===0 && !loading && <p className="text-lg text-center bg-white p-4 ">No product found</p>
      }

      {
        data.map((product, index) => {
          return (
            <div key={index} className="bg-white p-4 my-4 shadow rounded-md">
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-lg">{product.catagory}</p>
              <div className="flex gap-3">
                <p className="text-red-600 font-semibold text-lg">
                  {product.price}
                </p>
                <p className="text-slate-500 line-through text-lg">
                  {product.mrp}
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                Add to Cart
              </button>
            </div>
          );
        }
        )
      }
    </div>
  );
}

export default SearchProduct;
