import "./commentSection.scss"
// import { useAuthContext } from "../../hooks/useAuthContext"
import CommentCard from "../../components/Comment/CommentCard"


// "Login in"

export default function CommentSection (
    {comments}
){

    // console.log("hi"+comments);
    return (
        <div className="comment-section">
            <div className="comment-form">
            </div>
            <div className="comment-all">
                {comments.map((comment)=>(
                    <CommentCard 
                        key={comment._id}
                        comment={comment}
                    />
                ))}
            </div>
        </div>
    )

    
}

/*
- comment form 
    - handle submit

- comments.map

COMMENT:
Name
About x ago 
Content
*/