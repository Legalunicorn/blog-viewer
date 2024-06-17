
import { useEffect ,useState} from "react";
import { useSearchParams } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";

//components
import ArticleCard from "../../components/ArticleCard/ArticleCard";

import "./home.scss"

export default function Home(){
    const [articles,setArticles] = useState(); //TODO for now its [], to by pass loading, handle the loading with UL later
    // const [loading,setLoading] = useState(false);

    const {dispatch} = useAuthContext();
    const [searchParams,setSearchParams] = useSearchParams();
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        //when a user logs in after /api/auth/google

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
                setLoading(false);

            } catch(err){
                console.log(err); 
            }
        }
        getArticles();
    },[])

//create an article loader
// first, create an artlce style
    return (

        <>
            <div className="content">
                <div className="article-box">
                    {!isLoading &&
                    articles.map(article=>(
                        <ArticleCard key={article._id}
                            article={article}
                        />
                    ))
                    }
                </div>
                <div className="tag-box">
                    <p>Hi</p>
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