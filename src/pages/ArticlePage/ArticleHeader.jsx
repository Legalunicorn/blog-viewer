import { format } from "date-fns"
import "./articleHeader.scss"
import UpdateLikes from "../../components/Likes/UpdateLikes";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect,useState } from "react";
import { customFetch } from "../../utils/customFetch";
import Tag from "../../components/Tag/Tag";

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
    // console.log("test",article)

    useEffect(()=>{
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


    //parse the image
    console.log(JSON.stringify(article.image))

    const unescaped_amp = article.image;

    return (
        <div className="article-header"> 
            <p className="article-title">{article.title}</p>

            <div className="big-tag-list">
                {article.tags.map(tag=>(
                    <Tag
                        key={tag._id}
                        tag={tag}
                    />
                ))}
            </div>


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
                <img src={unescaped_amp} alt={unescaped_amp} />
            </div>
            
        

        </div>
    )
    
}

/*

- large image for the thumbnial
-Big TITLE  
wrirten by : ..... ||    LIKES: ()

big thimg naul 
*/