//takes in an article

import "./articleCard.scss"

import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom";


export default function ArticleCard({
    article //takes in an article with the following valeus
}) {
    // console.log(article);
    // console.log("HIIII")
    const createdAgo = `${formatDistanceToNow(article.createdAt)} ago..`
    let preview = article.body;
    if (preview.length>300){ 
        preview = preview.length.substring(0,300)+"..."
    }
    //truncated the text too 
    return (
        <>
        <div className="article-card">
            <div className="article-content">
                <Link className="article-title" to={'/articles/'+article._id}>
                    {article.title}
                </Link>
                {/* <a href={'/articles/'+article._id} className="article-title">{article.title}</a> */}
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