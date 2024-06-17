import "./commentSection.scss"
// import { useAuthContext } from "../../hooks/useAuthContext"
import CommentCard from "../../components/Comment/CommentCard"
import { customFetch } from "../../utils/customFetch";
import { useAuthContext } from "../../hooks/useAuthContext";


// "Login in"

export default function CommentSection ({
    comments,
    setComments
}
){

    const {user} = useAuthContext();

    //BUG add teh delete comment up here

    const handleEdit = (e) =>{
        const id = e.target.dataset.id;
        console.log("to edit id ",id);
        const body = e.target.comment_body.value;
        console.log("new body is",body);


        customFetch(`/comments/${id}`,{
            method:"PATCH",
            mode:"cors",
            headres:{
                'Authorization': `Bearer ${user.token}`,
                "Content-Type":'application/JSON',
            },
            body: JSON.stringify(body)
        }).then(res=>{
            if (res.ok) return res.json();
            throw Error("Couldnt edit comment")
        }).then(data=>{
            //update comment states
        })

    }
    const handleDelete = (e) =>{
        
        const comment_id = e.target.dataset.id;

        console.log("Deleteing comment id ",comment_id)
        console.log(e.target);
        customFetch(`/comments/${comment_id}`,{
            mode: "cors",
            method: "DELETE",
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res=>{
            if (res.ok) return res.json();
            throw Error("Deletion of comment failed.")
        }).then(data=>{ //data has the id br
            // console.log("deleting from backend")
            // console.log(data);
            setComments(
                comments.filter(item=>item._id!=data.comment._id)
            )
        }).catch(err=>{
            console.log(err);
        })

    }    

    //do you dont have to maintain a giant array of all comments inside each comment card
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
                        handleDelete={handleDelete}
                        handleEdit ={handleEdit}
                    />
                ))}
            </div>
        </div>
    )

    
}

