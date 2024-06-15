import { format } from "date-fns"
import "./articleHeader.scss"


export default function ArticleHeader({
    article
}){
    //TODO handle the likestates 
    /*
    how to handle the lights ? 
    -> useState[likes,setLikes] = article.like_count; //this is for the count
    // inside the props, we pass in whether the user has liked the post or not
    // then we set the class of the heart span depeneding if they liked
    -> handleCick
        > PATCH API: res.json 
        -> setLikes(res) //return new count from db?
        -> flip the boolean indicated whether the user has liked -> rerender the likes
        -> we are re-rendering the entire article header tho
        -> we should set up a likes component so that only it rerenders 
    */
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
            {/* this div below should be its own component */}
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