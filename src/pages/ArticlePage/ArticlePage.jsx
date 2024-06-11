


import ReactMarkDown from "react-markdown"
import remarkGftm from "remark-gfm"
import { useState,useEffect } from "react";




//load the comments for this article as well
//get the 

export default function ArticlePage(){
    const [comments,setComments] = useState([]);
    const [article,getArticle] = useState([]);

    useEffect(()=>{

        //TODO get the article and comments from backend api and lay them 
        const {id} = useParams();
        const setDatas = async () =>{
            try{
                const req = await fetch(
                    import.meta.env.VITE_API_URL+`/articles/${id}`
                );

            } catch(err){
                //throw error 
            }
        }


    },[])

    

}