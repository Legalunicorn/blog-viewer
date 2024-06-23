import { useAuthContext } from "../../hooks/useAuthContext"
import "./login.scss"
import { Form, useNavigate } from "react-router-dom"
import {useState} from 'react'
import { customFetch } from "../../utils/customFetch"
import GoogleButton from "../../components/Buttons/GoogleButton"

export default function Login(){


    const {dispatch} = useAuthContext();
    const nagivate = useNavigate();
    const [error,setError] = useState() //can be either "error" or "errors"


    const debug = ()=>{
        console.log("clicked!")
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //handle Form validation first before submitting
        
        try{
            const response = await customFetch('/auth/email/login',{
                method:"POST",
                mode:"cors",
                body: JSON.stringify({
                    email:e.target.email.value,
                    password:e.target.password.value,
                }),
                headers:{
                    'Content-Type':"application/json"
                }
            })

            const json = await response.json();
            //TODO refactor the login into a custom hoom
            if (response.ok){
                dispatch({type:"LOGIN",payload:{token:json.token,id:json.id}})
                localStorage.setItem('user',JSON.stringify({token:json.token,id:json.id}))
                nagivate("/");
                return;
            } else{ //error:"...."
                if (json.errors){ //from express-validator. I alrdy have FE validatio in place
                    //this is a user sneding data to API and bypassing FE validation
                    json.errors.forEach(err=>{
                        console.log(err)
                    })
                }
                if (json.error) setError(json.error)
            }
        } catch(err){
            setError(err)
        }
    }


    return (
        <div className="login-main">

            {/* <div className="">

            </div> */}
            <div className="login-form">
                <p className="site-brand">AlgoRice</p>
                <Form onSubmit={handleSubmit} className="email-form">
                    <input required type="email" name="email" placeholder="Email"/>
                    <input required type="password" name="password" placeholder="Password"/>
                    {error && 
                    <p>
                        <p className="error-message">{error}</p>
                    </p>
                    }

                    <button className="log-in form-button" type="submit">Login</button>

                </Form>

                <div className="other-option">
                    <p className="faint p">Or login with</p>
                    <GoogleButton/>
                    
                </div>
 
                
            </div>

        </div>
    )
}
