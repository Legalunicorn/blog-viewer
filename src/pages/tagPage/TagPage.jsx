// import "./tagPage.scss"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import { customFetch } from "../../utils/customFetch";
import ViewLoader from "../home/ViewLoader";
import BeatLoad from "../../components/Util/BeatLoad";
import "./tagPage.scss"


export default function TagPage(){

    const {id} = useParams();
    console.log("the ID IS ",id)
    const [articles,setArticles] = useState()
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const [view,setView] = useState('recent') //revent or top

    useEffect(()=>{

        async function fetchData(){
            const response = await customFetch(`/articles/tags/${id}/?sort=${view}`)
            const data = await response.json();
            if (!response.ok){
                setLoading(false);
                setError(data.error);
            }
            else{
                console.log(data);
                setArticles(data.articles);
                setLoading(false);
            }
        }

        try{
            fetchData()
        } catch(err){
            setLoading(false);
            setError(err.message);
            console.log(err)
        }

    },[view,id]) //when the view changes we rerun this call 



    return (
        <div className="tag-content">
            <div className="view-setter">
                <span className={view=="recent" && 'selected-view'}  onClick={()=>setView('recent')}>Recent</span>
                <span className={view=="top" && 'selected-view'}  onClick={()=>setView('top')}>Top</span>
        
            </div>

            {error ? 

                <p>hi {error}</p>
                :

                !loading ?
                    view=='recent'? 
                        <ViewLoader articles={articles}></ViewLoader>
                        :
                        <ViewLoader articles={articles}></ViewLoader>
                :
                <BeatLoad
                    loading={loading}
                    size={20}
                />
                
            } 


            
        </div>
    )
}