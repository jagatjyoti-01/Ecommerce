import React from 'react'
import { useParams } from 'react-router-dom'

function CatagoryProduct() {
  
    const params=useParams()
    console.log("njjjk",params)

    //the params show me catagory name if i click camara  it show me camara it is due to (path: "product-category/:catagoryName", in the router folder the :catagoryName is work like a params)

  return (
    <div>{params.catagoryName}</div>
  )
}

export default CatagoryProduct