
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

    useEffect(()=>{
        const token = searchParams.get("token");
        if (token!==null){
            localStorage.setItem('user',token)
            dispatch(({type:"LOGIN",payload:token})) 
            setSearchParams(); //delete the jwt from the URl
        }


        const getArticles = async () =>{
            try {
                const req = await fetch(
                    import.meta.env.VITE_API_URL +'/articles'
                );
                const json = await req.json();
                console.log(json);
                setArticles(json.all_articles);

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
        <div id="main">

            <div className="content">

                <div className="article-box">
                    {articles && articles.map(article=>(
                        <ArticleCard
                            article={article}
                        />
                    ))}
                </div>

                <div className="tag-box">
                    <p>Hi</p>
                </div>

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