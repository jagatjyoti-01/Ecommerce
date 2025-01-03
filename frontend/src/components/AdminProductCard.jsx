import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helper/displayCurrency";

function AdminProductCard({ product, key, fetchAllProduct }) {
  const [editProduct, SetEditpProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-44">
       <div className="w-32 h-32 flex justify-center items-center ">
       <img
          src={product?.productImage[0]}
          alt="product"
          
          className="mx-auto object-fill h-full"
        />
       </div>
        <h2 className="text-ellipsis line-clamp-2">{product?.productName}</h2>
        <div>
          <p className="font-semibold">
            {
          displayINRCurrency(product?.sellingPrice)
         
          }
          </p>
          <div
            className="ml-auto w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer "
            onClick={() => SetEditpProduct(true)}
          >
            <MdModeEdit />
          </div>
          <div>
            {editProduct && (
              <AdminEditProduct
                onclose={() => SetEditpProduct(false)}
                productEdit={product}
                fetchAllProduct={fetchAllProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
