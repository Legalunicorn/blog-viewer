
// import ReactMarkDown from "react-markdown"
// import remarkGftm from "remark-gfm"
import { useState, useEffect } from "react";


import ArticleMarkdown from "./ArticleMarkdown";
import ArticleHeader from "./ArticleHeader";
import CommentSection from "./CommentSection";
import CreateComment from "../../components/Comment/createComment";

import { customFetch } from "../../utils/customFetch";
import { useParams,useNavigate } from "react-router-dom";
import "./articlePage.scss"
import BeatLoad from "../../components/Util/BeatLoad";

//load the comments for this article as well
//get the 

export default function ArticlePage() {
    const [comments, setComments] = useState([]);
    const [article, setArticle] = useState({ article: { body: "hi" } });
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        customFetch(`/articles/${id}`)
            .then(res => {
                if (res.ok) return res.json()
                setLoading(false);
                navigate('/')
                throw new Error("Something went wrong.")
            })
            .then(data => {
                console.log(data)
                setLoading(false);
                setComments(data.comments);
                setArticle(data.article);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="article-view">
            {isLoading &&
                <BeatLoad
                    size="20"
                    loading={isLoading}
                />
             
            }
            {!isLoading && 
            <>
                <ArticleHeader article={article} />
                <ArticleMarkdown
                    article_body={article.body}
                />
                <h2 className="comment-count">Comments  ({comments.length})</h2>
                <div>
                    <CreateComment 
                        article_id={article._id}
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
                <div>
                    <CommentSection
                        comments={comments}
                        setComments={setComments}
                        
                    />
                </div>
            </>}
        </div>

    )

}
