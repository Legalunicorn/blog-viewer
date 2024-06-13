const API_URL = import.meta.env.VITE_API_URL

export const customFetch = async(url,options)=>{
    const response = await fetch(API_URL+url,options)
    return response;
}