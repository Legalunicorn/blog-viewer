import { useAuthContext } from "../../hooks/useAuthContext"
import "./signup.scss"
import { Form ,useNavigate} from "react-router-dom"
import { customFetch } from "../../utils/customFetch"
import { useState } from "react"
import GoogleButton from "../../components/Buttons/GoogleButton"

export default function Signup(){

    const {dispatch} = useAuthContext();
    const nagivate = useNavigate();
    const [error,setError] = useState(null)


    const handleSubmit = async (e)=>{
        //TODO validate the username, ONLY alphanumeric characters are allowed, along with "." and "_" 
        e.preventDefault();
        try{
            const response = await customFetch("/auth/email/signup",{
                method: "POST",
                mode:"cors",
                body: JSON.stringify({
                    email:e.target.email.value,
                    password:e.target.password.value,
                    display_name: e.target.name.value
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if (response.ok){
                dispatch({type:"LOGIN",payload:{token:json.token,id:json.id}});
                localStorage.setItem('user',JSON.stringify({token:json.token,id:json.id}));
                nagivate("/");
            }else{ 
                if (json.errors){
                    json.errors.forEach(err=>{
                        console.log(err);
                    })
                }
                if (json.error) setError(error);
            }
        } catch(err){
            setError(error)
        }
    }



    return (
        <div className="login-main">

            {/* <div className="">

            </div> */}
            <div className="login-form">
                <p className="site-brand">AlgoRice</p>
                <Form onSubmit={handleSubmit}className="email-form">
                    <input pattern="[a-zA-Z0-9._ ]+" required minlength="2" maxlength="50" type="name" name="name" placeholder="Display name"/>
                    <input required type="email" name="email" placeholder="Email"/>
                    <input required type="password" name="password" placeholder="Password"/>


                    {error &&
                        <p className="error-message">{error}</p>
                    }
                    <button className="sign-up form-button" type="submit">Sign up</button>
      

                </Form>

                <div className="other-option">
                    <p className="faint p">Or login in with</p>
                    <GoogleButton/>
                </div>
                
 
            
            </div>

        </div>
    )
}
