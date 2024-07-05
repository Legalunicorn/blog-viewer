import "./tag.scss"
import { Link } from "react-router-dom"


export default function Tag({tag}){
    // console.log("in tag",tag.name)
    // console.log(tag._id)
    return (
        <Link to={`/articles/tags/${tag._id}`}>
            <p className="tag">{tag.name}</p>
        </Link>
    )
}