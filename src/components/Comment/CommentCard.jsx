//takes in a comment and puts out a card
// properties
// Author name
// written when
// comment body (parse markdown? nah)

import { formatDistanceToNow } from "date-fns";
import "./commentCard.scss"

export default function CommentCard({comment}){
    const date_distance = formatDistanceToNow(comment.createdAt);
    return (
        <div className="comment-card">
            <div className="comment-meta">
                <span className="material-symbols-outlined">
                person
                </span>
                <div>
                    <p className="comment-author">{comment.author.display_name}</p>
                    <p className="comment-date">{date_distance}</p>
                </div>

            </div>

            <p className="comment-body">{comment.body}</p>
        </div>
    )
}