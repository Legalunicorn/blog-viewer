
import "./home.scss"
import ArticleCard from "../../components/ArticleCard/ArticleCard"
//just borrow the styling from home 

export default function ViewLoader({
    articles
}){
    return (
    <div className="article-box-view">
        {articles.map(article=>(
            <ArticleCard key={article._id}
                article={article}
            />
        ))}
    </div>
    )
}