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

    const handleCancel = (e)=>{
        console.log(e.target.parentNode.parentNode)
        e.target.parentNode.parentNode.firstChild.value=""
    }


    const handleSubmit =(e)=>{
        e.preventDefault();
        if (!user){ //if just checking if its not null
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
                    'Authorization': `Bearer ${user.token}` 
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
                <div className="comment-buttons">
                    <button className="cancel" type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                    
                </div>
         
            </Form>
        </div>
    )

}
