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

    const handleClickEdit = () =>{
        //we change the comment body to a form
        //we also close the drop down options menu in this component
        flipEditing(),
        setIsOpen(false)
    }


  
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
                    <p onClick={handleClickEdit}>Edit</p>
                </div>
                }

        </div>
    )
}