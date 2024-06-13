
// import ReactMarkDown from "react-markdown"
// import remarkGftm from "remark-gfm"
import { useState, useEffect } from "react";


import ArticleMarkdown from "./ArticleMarkdown";
import ArticleHeader from "./ArticleHeader";
import CommentSection from "./CommentSection";
import CreateComment from "../../components/Comment/createComment";

import { customFetch } from "../../utils/customFetch";
import { useParams } from "react-router-dom";
import "./articlePage.scss"

//load the comments for this article as well
//get the 

export default function ArticlePage() {
    const [comments, setComments] = useState([]);
    const [article, setArticle] = useState({ article: { body: "hi" } });
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        //TODO get the article and comments from backend api and lay them 
        customFetch(`/articles/${id}`)
            .then(res => {
                if (res.ok) return res.json()
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

    //TODO implementing loading thing, for now no errorr bc use state is [] not null 
    return (
        <>
            {!isLoading && <div className="article-view">
                {/* <div>

                    <p>//This is for the article card w large thumbnail</p>
                </div> */}
                <ArticleHeader
                    article={article}
                />
                <div>
                    <ArticleMarkdown
                        article_body={article.body}
                    />
                </div>
                <h2 className="comment-count">Comments  ({comments.length})</h2>
                <div>
                    <CreateComment 
                        article_id={article._id}
                        comments={comments}
                        setComments={setComments}
                    />
                    {/* comment form goes here? */}
                </div>
                <div>
                    <CommentSection
                        comments={comments}
                        
                    />

                </div>
            </div>}
        </>

    )

}
//article-view -> for the entire winfow