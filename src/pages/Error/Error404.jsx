import "./style.scss"
import logo from "../../assets/images/rice-bowl-icon.svg"
import { useNavigate } from "react-router-dom"

export default function Error404(){

    const navigate = useNavigate();
    const handleClick = () =>{

        navigate("/")
    }
    return (

  


        <div className="error-page">
            <div className="error-box">
                <img onClick={handleClick} src={logo} alt="logo"></img>
                <h1>Uh-oh, page not found!</h1>
                <p>The page you're looking for isn't here. Let's take you back to safety!</p>
            </div>
           
        </div>
    )
}