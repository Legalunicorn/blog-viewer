import { format } from "date-fns"
import "./articleHeader.scss"


export default function ArticleHeader({
    article
}){
    //TODO handle the likestates and commens 
    const formattedDate = format(article.createdAt,'dd MMM yyyy');

    //TODO handle the link buttom
    return (
        <div className="article-header"> 
            <p className="article-title">{article.title}</p>
            {/* <hr/> */}
            <div className="article-meta">
                <p>{article.author.display_name} •</p>
                <p>{formattedDate}</p>
            </div>
            {/* <hr/> */}
            <div className="article-likes">
                    <span className="material-symbols-outlined">favorite</span>
                    <span>{article.likes_count}</span>
            </div>
            <div className="article-image">
                <img src={article.image} alt="article thumbnail" />
            </div>
            
        

        </div>
    )
    
}
//TODO add and style the tages below "author+created date"

/*

- large image for the thumbnial
-Big TITLE  
wrirten by : ..... ||    LIKES: ()

big thimg naul 
*/