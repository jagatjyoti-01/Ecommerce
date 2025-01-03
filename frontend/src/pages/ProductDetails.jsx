import React, { useCallback, useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import SummerApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helper/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategroyWiseProductDisplay from "../components/CategroyWiseProductDisplay";
import CatagoryList from "../components/CatagoryList";
function ProductDetails() {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: '',
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [ActiveImage, setActiveImage] = useState("");
  const [zoomImageCo, setZoomImageCo] = useState({
    x: 0,
    y: 0,
  });
  const [openZoomImage, setOpenZoomImage] = useState(false);
  const params = useParams();
  const productImageListLoading = new Array(4).fill(null);
  // console.log("product id", params); // here it show the product id from the url params

  const featchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummerApi.productDetails.url, {
      method: SummerApi.productDetails.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data.productImage[0]);
    //console.log("Fetched Category:", dataResponse?.data?.category)
  };
  console.log('product details',data)
  useEffect(() => {
    featchProductDetails();
  }, []);

  const hendelMouseOver = (image) => {
    setActiveImage(image);
  };
  console.log("produt full details ", data);
  

  const hendelZoomImage = useCallback(
    (e) => {
      setOpenZoomImage(true)
      const { top, left, width, height } = e.target.getBoundingClientRect();
      console.log("top", top, "left", left, "width", width, "height", height);
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCo({ x, y });
      
    },
    [zoomImageCo]
  );

  const helelLeaveImage = () => {
    setOpenZoomImage(false)
  }
  const normalizedData = { ...data, category: data.catagory };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex lg:flex-row-reverse flex-col gap-4 ">
          <div className="h-[300px] w-300px] lg:h-96 lg:w-96 bg-slate-200 relative">
            <img
              src={ActiveImage}
              alt="a"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={hendelZoomImage}
              onClick={hendelZoomImage}
              onMouseLeave={helelLeaveImage}
            />
            {/* zooming image  */}
           {
            openZoomImage && (
              <div className="hidden lg:block absolute min-h-[400px] min-w-[500px] bg-slate-200 top-0 -right-[510px] overflow-hidden scale-125  ">
              <div
                className="h-full w-full  min-h-[400px] min-w-[500px] object-scale-down mix-blend-multiply scale-105 overflow-hidden"
                style={{
                  backgroundImage: `url(${ActiveImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${zoomImageCo.x * 100}% ${
                    zoomImageCo.y * 100
                  }%`,
                }}
              >
                {/* <img
                src={ActiveImage}
                alt="a"
                className="h-full w-full object-scale-down mix-blend-multiply"/> */}
              </div>
            </div>
            )
           }
          </div>

          {/* product image */}
          <div className="h-96 ">
            {loading ? (
              <div className="gap-2 flex lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((item, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="gap-2 flex lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((item, index) => (
                  // console.log('item', item), here it show the image url
                  // mouse over event
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 p-1 cursor-pointer"
                    onMouseEnter={() => hendelMouseOver(item)}
                    onClick={() => hendelMouseOver(item)}
                  >
                    <img
                      src={item}
                      alt=""
                      className="h-full w-full object-scale-down  mix-blend-multiply"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          {/* product details */}
          {loading ? (
            <div className="grid gap-1 w-full ">
              <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
              <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full"></h2>
              <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

              <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
                <p className="text-red-600 bg-slate-200 w-full"></p>
                <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
              </div>

              <div className="flex items-center gap-3 my-2 w-full">
                <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
                <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
              </div>

              <div className="w-full">
                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
                <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-1xl lg:text-3xl font-medium">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-400">{data?.category}</p>
              <div className="text-red-600 flex items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
              <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                <p className="text-red-600">
                  {displayINRCurrency(data.sellingPrice)}
                </p>
                <p className="text-slate-400 line-through">
                  {displayINRCurrency(data.price)}
                </p>
              </div>
              <div className="flex items-center gap-3 my-2">
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white">
                  Buy
                </button>
                <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white">
                  Add To Cart
                </button>
              </div>
              <div>
                <p className="text-slate-600 font-medium my-1">
                  Description :{" "}
                </p>
                <p>{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
     

      {
  normalizedData?.category && (
    <CategroyWiseProductDisplay category={normalizedData?.category} heading={"Recommended Product"} />
  )
}
      {/* {
        <CategroyWiseProductDisplay category={data.category} heading={"Mobiles"}/>
      } */}
      
      
    </div>
  );
}

export default ProductDetails;
