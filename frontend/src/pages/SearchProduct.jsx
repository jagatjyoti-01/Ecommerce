import {React,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import SummerApi from "../common";

function SearchProduct() {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('q')
    
  
    console.log('query', location)
    
    const fetchProducts = async () => {
    const responce=await fetch(SummerApi.searchProduct.url + query)
    const responcedata=await responce.json()
    console.log('data', responcedata)
    }
    useEffect(() => {
      fetchProducts()
    }, [])
  
  return (
    <div>
      sfqwaqwfaf
    </div>
  )
}

export default SearchProduct
