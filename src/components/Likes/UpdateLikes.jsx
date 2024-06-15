
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react";
import { customFetch } from "../../utils/customFetch";

export default function UpdateLikes({
    article_id,
    like_count,
    has_liked, //check whether the user has liked 
}){

    //
    const [likeCount,setLikeCount] = useState(like_count);
    const [hasLike,setHasLiked] = useState(has_liked);
    const {user} = useAuthContext();


    //function to handle like count 

    const handleClick = () =>{ //TODO render it in article header to put a reguar span
                               // is user=null, only render this component if user is logged in
        if (!user){ //this check technically shouldnt be necessary since this component would be rendered conditionality
            //not logined, ignore request to like post
            return;
        }

        customFetch(`/articles/${article_id}`,{
            method: "PUT",
            mode: "cors",
            headers:{
                "Authorization": `Bearer ${user.token}`,
            }
        }).then(res=>{
            if (res.ok) return .jsonres.json()
            throw new Error("Oops! SOmeyjing ")
        }).then(like_count=>{
            /*
            //TODO thin about this
            Should i do this? 
            wait until the response is received then update the likes
            
            or i base on the has_liked state to increment/decrement the like count,
            then flip the like_state
            */

        }).catch(err=>{
            console.log(err)
        })





    }


    //JSX
    return(
        <div className="article-likes">
            {has_liked?
                <span onClick={handleClick} className="fill material-symbols-outlined">favorite</span>
            :
                <span onClick={handleClick} className="material-symbols-outlined">favorite</span>
            }
            <span>{article.likes_count}</span>
        </div>
    )

}