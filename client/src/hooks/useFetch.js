import React, { useEffect, useState } from "react";
import axios from 'axios'

export const useFetch = ( url ) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                setLoading(true) 
                const res = await axios.get(url)
                setData(res.data)
            } catch(err) {
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
        
    }, [url])
    
    const reFetchData = async() => {
        try {
            setLoading(true)
            const res = await axios.get(url)
            setData(res.data)
        } catch(err) {
            setError(err)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetchData }
}