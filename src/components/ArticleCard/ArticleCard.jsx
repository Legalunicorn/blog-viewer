//takes in an article

import "./articleCard.scss"

import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";


export default function ArticleCard({
    article //takes in an article with the following valeus
}) {
    const createdAgo = `${formatDistanceToNow(article.createdAt)} ago..`
    // let preview = article.body;
    // if (preview.length>300){ 
    //     preview = preview.length.substring(0,300)+"..."
    // }
    //truncated the text too 

    //TODO print out the comment card too
    return (
        <>
        <div className="article-card">
            <div className="article-content">
                <Link className="article-title" to={'/articles/'+article._id}>
                    {article.title}
                </Link>

                <div className="tag-list">
                    {article.tags.map(tag=>(
                        <Tag
                            key={tag._id}
                            tag_name={tag.name}
                        />
                    ))}
                </div>




                <div className="article-meta">
                    <p>{article.author.display_name} •</p>
                    <p>{createdAgo}</p>
                </div>
                <div className="article-likes">
                    <span className="material-symbols-outlined">favorite</span>
                    <span>{article.likes_count}</span>
                </div>
   
            </div>
            <img className="article-image" src={article.image} alt="Article_ image" />
    
        </div>
        </>
    )
}


/*
fields
- title
- body (simplify the body)
- created at(format it)
- likes 
- tages 
- author.name
*/