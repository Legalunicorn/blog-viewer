
//for the markdown customisation
// `code` is a markdown type, to understand how its used, refer
// to the react-markdown github readme, Appendix B 

import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import "./articleMarkdown.scss"
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";




export default function ArticleMarkdown({article_body}){

    article_body = article_body.replace(/\\n/g,'  \n') //
    return (
        <Markdown
            children = {article_body}
            // children = {article_body.replace(/\n/g,' ')}
            className='article-body'
            components = {{
                code(props){
                    const {children,className,node,...rest} = props;
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                        <SyntaxHighlighter 
                            {...rest}
                            PreTag="div"
                            children = {String(children).replace(/\n$/,"")}
                            language={match[1]}
                            // style={dark}
                        />
                    ) : ( 
                        <code {...rest} className={`${className} no-lang`}>
                            {children}
                        </code>
                    )
                }
            }}
        />
    )

}
