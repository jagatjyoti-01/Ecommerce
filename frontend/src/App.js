import './App.css';
import './index.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummerApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


//show the user 
function App() {
  //this is the user number of product add in the cart 
  const [countProduct,setCountProduct]=useState(0)
  console.log('number of product in cart',countProduct)



  const dispatch=useDispatch();
 
    const fetchUserDetails = async () => {
      try {
      const dataResponce = await fetch(SummerApi.current_user.url, {
        method: SummerApi.current_user.method,
        credentials: 'include'
      });
      if (!dataResponce.ok) {
        console.error('Error fetching user details:', dataResponce.status, dataResponce.statusText);
        return;
      }
      const dataApi = await dataResponce.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))

      }
     
      // console.log("data_user", dataResponce, dataApi);   // it show resent user whow loged in 
    } catch (error) {
      console.error('Error fetching user details:', error);
      
    }
  }

  const featchUserAddtoCart=async()=>{
    const dataResponse=await fetch(SummerApi.addToProductiCount.url,{
      method:SummerApi.addToProductiCount.method,
      credentials:'include'
    })
    const response=await dataResponse.json()
    setCountProduct(response.data?.count)
    console.log('number of data paresent in cart is ',response)
  }
    useEffect(() => {
      // user Details
      fetchUserDetails();
      // total number of cart present
      featchUserAddtoCart();
    }, [])



    return (
      <>
        <Context.Provider value={{

          fetchUserDetails   //user details featch and shere every component by context provider (index.js in context folder)
        }} >
          <ToastContainer />

          <Header></Header>
         
          <main className='min-h-[calc(100vh-110px)] pt-16'>
            <Outlet />
          </main>
          <Footer></Footer>
          {/* here the outlet is use diplay the all pages we creted in routes folder */}
        </Context.Provider>
      </>
    );
  }

export default App;
