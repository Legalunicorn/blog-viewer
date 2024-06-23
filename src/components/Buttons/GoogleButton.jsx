
import "./googleButton.scss"
import google_logo from "./google-icon.png"
export default function GoogleButton(){
    return(
        <a className="google-button" href={`${import.meta.env.VITE_API_URL}/auth/google`}>
            <p className="google-form-button">
                <img src={google_logo} alt="" />
                Google
            </p>
        </a>
    )
}