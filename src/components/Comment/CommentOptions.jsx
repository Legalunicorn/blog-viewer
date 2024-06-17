import "./commentOptions.scss"
import { useState } from "react"

/**
 * For handling delete and edit requests and 
 * How am i gonna handle editing though ]
 * one way is to use a pop up form but im really too lazy for that 
 * can i put the input directly in the comment section? 
 * i do that by use: "isEditing" state. then either render the input or the comment like wise 
 */


export default function CommentOptions({
    comment_id,
    // token,
    handleDelete,
    flipEditing
}){
    
    //
    const [isOpen,setIsOpen] = useState(false);
    const handleDrop = () =>{
        setIsOpen(!isOpen);
    }


    // Need a sneaky way to refresh the data
    // const handleDelete = () =>{

    //     customFetch(`/comments/${comment_id}`,{
    //         mode: "cors",
    //         method: "DELETE",
    //         headers:{
    //             'Authorization': `Bearer ${token}`
    //         }
    //     }).then(res=>{
    //         if (res.ok) return res.json();
    //         throw Error("Deletion of comment failed.")
    //     }).then(data=>{ //data has the id br
    //         setComments(
    //             comments.filter(item=>item._id!=data._id)
    //         )
    //     }).catch(err=>{
    //         console.log(err);
    //     })

    // }

    return (
        <div className="dropdown">
                <span onClick={handleDrop} className="dropdown-button material-symbols-outlined">more_vert</span>
                {isOpen  &&
                <div className="dropdown-content">
                    <p data-id={comment_id} onClick={handleDelete} className="danger">Delete
                        {/* <span class="material-symbols-outlined">
                        delete
                        </span> */}
                    </p>
                    <p onClick={flipEditing}>Edit</p>
                </div>
                }

        </div>
    )
}