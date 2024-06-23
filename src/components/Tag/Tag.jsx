import "./tag.scss"
import { Link } from "react-router-dom"


//TODO make this a tag object, with a link to /articles/tag/tag_id
// export default function Tag({tag_name}){
//     return (
//         <span className="tag">{tag_name}</span>
//     )
// }

// export default function _Tag({tag})({
//     return (
    
//     )
// })

export default function Tag({tag}){
    // console.log("in tag",tag.name)
    // console.log(tag._id)
    return (
        <Link to={`/articles/tags/${tag._id}`}>
            <p className="tag">{tag.name}</p>
        </Link>
    )
}