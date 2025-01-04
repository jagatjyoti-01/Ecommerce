//import getCatagorywiseProduct from "../../../backend/controller/product/getCatagoryWiseproduct";



const backendDomain="http://localhost:8080"
const SummerApi={
    signup:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:'post'
    },
    current_user:{
        url:`${backendDomain}/api/user-details`,
        method:"get"
    },
    logout_user:{
        url:`${backendDomain}/api/Logout`,
        method:'get'
    },
    allUser:{
        url:`${backendDomain}/api/all-User`,
        method:'get'
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:"post"  

    },
    uploadProduct:{
       url:`${backendDomain}/api/upload-product`,
            method:"post"  
    },
    getallProduct:{
       url:`${backendDomain}/api/get-products`,
            method:"get"  
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method:"post"
    },
    catagoryProduct:{
        url:`${backendDomain}/api/get-product-catagory`
    },
    getCatagorywiseProduct:{
        url:`${backendDomain}/api/catagory-product`,
        method:"post"
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : 'post'
    },
    addToCartProduct:{
         url : `${backendDomain}/api/addtocart`,
         method : 'post'
    },
    addToProductiCount:{
        url:`${backendDomain}/api/countAddToCartProduct`,
        method:'get'
    },
    addtoCartProductView:{
        url:`${backendDomain}/api/addToCartViewProduct`,
        method:'get'
    }


}

export default SummerApi;