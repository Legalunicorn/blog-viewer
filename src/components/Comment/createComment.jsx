import "./createComment.scss"
import { Form ,useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import { customFetch } from "../../utils/customFetch";
import TextareaAutosize from "react-textarea-autosize";
// import reactTextareaAutosize from "react-textarea-autosize";



//load up a form

//handle click

export default function CreateComment({
        article_id,
        comments,
        setComments
      
}){
    const nagivate = useNavigate();
    const {user} = useAuthContext();
    const handleSubmit =(e)=>{
        e.preventDefault();
        if (!user){
            console.log("rerouting to login page")
            nagivate("/login",{replace:true});
        }
        else{
            
            customFetch(`/articles/${article_id}/comments`,{
                method: "POST",
                mode: "cors",
                body: JSON.stringify({body:e.target.comment_body.value}),
                headers:{
                    "Content-Type":'application/JSON',
                    //TODO make a custom customAuthFetch on the CMS client
                    'Authorization': `Bearer ${user}`
                }
            }).then(res=>{
                if (res.ok) return res.json(); //Should be receiving the comment created from the DB
                throw new Error("Opps! Something went wrong.")
            }).then(data=>{ //reset the comment buddy
                e.target.comment_body.value="";
                setComments([
                    data.comment,
                    ...comments
                    
                ])
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

    return (
        <div>
            <Form className="form comment-form" onSubmit={handleSubmit}>
                <TextareaAutosize
                    className="comment-body"
                    name="comment_body"
                    placeholder="Something to comment..."
                />
                {/* <input name="comment_body" placeholder="Type something to comment..." 
                type="textarea"/> */}
                <button type="submit">Submit</button>
            </Form>
        </div>
    )

}
