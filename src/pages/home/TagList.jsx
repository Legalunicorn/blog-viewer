import Tag from "../../components/Tag/Tag"


export default function TagList({
    tags
}){
    console.log(tags);
    console.log("haw?")
    return (
        <div className="tag-group">
            {tags.map(tag=>(
                // <p>{tag.name}</p>
                <Tag tag={tag}/>
            ))}
        </div>
    )
}