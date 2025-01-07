import{ React,useState} from 'react'
import SummerApi from '../common'

function Cart() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchData=async()=>{
        setLoading(true)
        const response=await fetch(SummerApi.addtoCartProductView.url,{
            method:SummerApi.addtoCartProductView.method,
            headers:{
                'Content-Type': 'application/json',
            },

        })
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }
  return (

    <div className='mx-auto container'>
    <div className=' text-center text-lg py-3'>
        {
            data.length===0 & !loading && (
                <div>no avl data</div>
            )
               
            
        }
    </div>
    <div>

    </div>
    </div>
  )
}

export default Cart