//takes in a comment and puts out a card
// properties
// Author name
// written when
// comment body (parse markdown? nah)

import { formatDistanceToNow } from "date-fns";
import "./commentCard.scss"
import { useAuthContext } from "../../hooks/useAuthContext";
import CommentOptions from "./CommentOptions";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize"; 
import { Form } from "react-router-dom";

export default function CommentCard({
    comment,
    handleDelete,
    handleEdit
}){

    const date_distance = formatDistanceToNow(comment.createdAt);
    const {user} = useAuthContext(); //get the user from auth context
    const is_author = (user && user.id===comment.author._id)? true:false;
    //check if the commenter belongs to the usser

    const [isEditing,setIsEditing] = useState(false);
    const [textArea,setTextArea] = useState(comment.body)



    const handleChange= (e)=>{
        setTextArea(e.target.value); 
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleEdit(e)
        flipEditing()
    }


    
    const flipEditing = () =>{
        setTextArea(comment.body)
        setIsEditing(!isEditing);
    }


    return (
        <div className="comment-card">
            <div className="comment-meta">
                {is_author?
                    <span className="the-author material-symbols-outlined">person</span>
                :
                    <span className="material-symbols-outlined">person</span>
                }
                <div>
                    {is_author?
                        <p className="the-author">{comment.author.display_name} (You)</p>
                    :
                        <p className="">{comment.author.display_name}</p>
                    }
                    <p className="comment-date">{date_distance}</p>
                </div>
                {is_author && (
                    <CommentOptions
                        comment_id = {comment._id}
                        handleDelete ={handleDelete}
                        flipEditing = {flipEditing}
                    />
                )}

            </div>
            
            {isEditing?(
                // e.target.comment_body.value
                <Form className="comment-form" data-id={comment._id} onSubmit={handleSubmit}>
                    <TextareaAutosize
                        className="comment-edit"
                        name="comment_body"
                        value={textArea}
                        onChange={handleChange}

                    />
                    <div className="comment-buttons form">
                        <button className="cancel" type="button" 
                        onClick={()=>{
                            flipEditing()

                        }}>
                            Cancel
                        </button>
                        <button type="submit">Save</button>
                    </div>
                </Form>

            )
            :
            <p className="comment-body">{comment.body}</p>
            }
        </div>
    )
}