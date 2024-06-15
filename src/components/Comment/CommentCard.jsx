//takes in a comment and puts out a card
// properties
// Author name
// written when
// comment body (parse markdown? nah)

import { formatDistanceToNow } from "date-fns";
import "./commentCard.scss"
import { useAuthContext } from "../../hooks/useAuthContext";

export default function CommentCard({comment}){
    const date_distance = formatDistanceToNow(comment.createdAt);
    const {user} = useAuthContext(); //get the user from auth context

    //BUG user is the JWT not the id of the user. please find a way to fix this
    const is_author = (user && user.id===comment.author._id)? true:false;
    // console.log(user.id+"   . . . . ..   "+comment.author._id);
    // console.log(is_author)
    //check if the commenter belongs to the usser
    // first check that the user is not null?
    return (
        <div className="comment-card">
            <div className="comment-meta">
                {/* //TODO bring up the is_author ternary and change the google icon color too */}
                <span className="material-symbols-outlined">person</span>
                <div>
                    {is_author?
                    <p className="the-author">{comment.author.display_name} (You)</p>:
                    <p className="">{comment.author.display_name}</p>
                    }
                    <p className="comment-date">{date_distance}</p>
                </div>

            </div>

            <p className="comment-body">{comment.body}</p>
        </div>
    )
}
//TODO figure out a way to edit the comment in the card itself
/*
Add a use state to check if comment is being edited?
*/