import { format } from "date-fns"
import "./articleHeader.scss"
import UpdateLikes from "../../components/Likes/UpdateLikes";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect,useState } from "react";
import { customFetch } from "../../utils/customFetch";

//this is loaded regardless if the user is logged in or not
//therefore 

export default function ArticleHeader({
    article //we need the has like information
}){

    const formattedDate = format(article.createdAt,'dd MMM yyyy');
    const {user} = useAuthContext();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [hasLiked,setHasLiked] = useState();

    useEffect(()=>{
        console.log("loading header: ")
        if (user){ //logged in personal. we want to check if they liked this post before
            customFetch(`/like/articles/${article._id}`,{
                headers:{
                    "Content-Type":'application/JSON',
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res=>{
                if (res.ok) return res.json();
                setError(true);
            }).then(data=>{
                console.log("HASLIKED?:",data.has_liked);

                setLoading(false);
                setHasLiked(data.has_liked);
            }).catch(err=>{
                console.log(err);
                setError(true);
            })

        } else {
            setLoading(false); //we dont need this actually bc if user === null 
            // loading or not, we will just render the static componenet
        }
    },[])

    //TODO handle the link buttom
    return (
        <div className="article-header"> 
            <p className="article-title">{article.title}</p>
            {/* <hr/> */}
            <div className="article-meta">
                <p>{article.author.display_name} •</p>
                <p>{formattedDate}</p>
            </div>
            {(user && !loading && !error)?
                <UpdateLikes
                    article_id = {article._id}
                    like_count = {article.likes_count}
                    has_liked = {hasLiked}
                />
            :
                <div className="article-likes">
                    <span className="material-symbols-outlined">favorite</span>
                    <span>{article.likes_count}</span>
                </div>
            }

            

            <div className="article-image">
                <img src={article.image} alt="article thumbnail" />
            </div>
            
        

        </div>
    )
    
}
//TODO add and style the tages below "author+created date"

/*

- large image for the thumbnial
-Big TITLE  
wrirten by : ..... ||    LIKES: ()

big thimg naul 
*/