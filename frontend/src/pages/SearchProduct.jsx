import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummerApi from "../common";
import VerticalProductCard from "../components/VerticalProductCard";

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
      <p className="text-lg font-semibold py-3">search Result : {data.length}</p>
      {
        data.length ===0 && !loading && <p className="text-lg text-center bg-white p-4 ">No product found</p>
      }

      {
        data.length !==0 && !loading && 
        
           <VerticalProductCard loading={loading} data={data}/>
          
      
      
    }
      
    </div>
  );
}

export default SearchProduct;
