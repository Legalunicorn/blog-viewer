
import { useEffect ,useState} from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

//components
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import ViewLoader from "./ViewLoader";
import TagList from "./TagList";
import BeatLoad from "../../components/Util/BeatLoad";

import "./home.scss"

export default function Home(){
    const [articles,setArticles] = useState();
    const [topArticles,setTopArticles] = useState();
    const [tags,setTags] = useState();

    const {dispatch} = useAuthContext();
    const [searchParams,setSearchParams] = useSearchParams();

    const [isLoading,setLoading] = useState(true);
    const [view,setView] = useState('recent') //recent or top

    useEffect(()=>{
        const token = searchParams.get("token");
        const id = searchParams.get("id");
        if (token!==null && id!==null){
          
            dispatch({type:'LOGIN',payload:{token:token,id:id}})
            localStorage.setItem('user',JSON.stringify({token:token,id:id}))
            setSearchParams(); //delete the jwt and idfrom the URl
        }

        const getArticles = async () =>{
            try {
                const req = await fetch(
                    import.meta.env.VITE_API_URL +'/articles'
                );
                const json = await req.json();
                console.log(json);
                setArticles(json.all_articles);
                setTopArticles(json.top_articles);
                setTags(json.tags);
                setLoading(false);

            } catch(err){
                //404? internal server error? goes here instead 
                console.log(err); 
            }
        }
        getArticles();
    },[])


    //TODO move "content" class to index.scss instead 
    return (
        <>
            <div className="content"> 
                <div className="article-box">
                    <div className="view-setter">
                        <span onClick={()=>setView('recent')}>Recent</span>
                        <span onClick={()=>setView('top')}>Top</span>
                       
                    </div>

                    {!isLoading ? 
                        view=='recent' ? 
                            <ViewLoader articles={articles}/>:
                            <ViewLoader articles={topArticles}/>
                    :
                    <BeatLoad
                        loading={isLoading}
                        size={20}

                    />

                    }
                </div>



                <div className="tag-box">
                    <p className="tag-header">Tags</p>
                    {!isLoading && 
                    <TagList className="tag-list" tags={tags} />
                    }
                </div>
                

            </div>
        </>
    )
}


// header and footer already provided
// just focus on the meat for the home page

/*

Things to add

-> SideBar of "tags"

-> ArticleCardSmall in a
-> Use a fetch heere? 
*/