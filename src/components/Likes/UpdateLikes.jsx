
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react";
import { customFetch } from "../../utils/customFetch";
import "./updateLikes.scss"

export default function UpdateLikes({
    article_id,
    like_count,
    has_liked
}){
    //THIS COMPONENT WILL ONLY LOAD FOR LOGGED IN USERS
    console.log("hh",has_liked);
    // retrive the like 
    const [likeCount,setLikeCount] = useState(like_count);
    const [hasLiked,setHasLiked] = useState(has_liked);
    const {user} = useAuthContext();
  

    const updateLikes = () =>{
        console.log("updating likes ???",likeCount,hasLiked)
        if (hasLiked){
            setLikeCount(likeCount-1);
            setHasLiked(false);
        }
        else{          
            setLikeCount(likeCount+1);
            setHasLiked(true);
        }
    }

    //when like button is clicked
    const handleClick = () =>{ //TODO render it in article header to put a reguar span
        //technically not necessary since this component shouldnt be loaded if user is not logged in
        if (!user) return;
        
        updateLikes(); //we update within the component, not yet in the backend
        customFetch(`/like/articles/${article_id}`,{
            method: "PUT",
            mode: "cors",
            headers:{
                "Authorization": `Bearer ${user.token}`,
            }
        }).then(res=>{
            if (res.ok) return res.json(); //ignore this json data for now 
            updateLikes(); //undo the change we made earlier        
            throw new Error("Failed to update Likes")
 
        }).catch(err=>{
            updateLikes(); //undo the change we made earlier
            console.log(err)
        })
    }

    //JSX
    return(
        <div className="article-likes">
            {hasLiked?
                <span onClick={handleClick} className="fill-red material-symbols-outlined">favorite</span>
            :
                <span onClick={handleClick} className="material-symbols-outlined">favorite</span>
            }
            <span>{likeCount}</span>
        </div>
    )

}