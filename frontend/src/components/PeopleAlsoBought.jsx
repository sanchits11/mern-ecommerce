import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import LoadingSpinner from './LoadingSpinner'
import {toast} from 'react-hot-toast'
import axios from '../lib/axios'

const PeopleAlsoBought = () => {

    const [recommendations, setRecommendations] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(()=> {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations")
                setRecommendations(res.data)   
            } catch (error) {
                toast.error(error.response.data.message || "Error fetching products")
            } finally {
                setloading(false)  
            }
        }

        fetchRecommendations();
    },[])

    if(loading) return <LoadingSpinner/>

    return (
    <div className='mt-8'>
        <h3 className='text-2xl font-semibold text-blue-400'>
            People Also Bought
        </h3>
        <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3'>
            {recommendations.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default PeopleAlsoBought