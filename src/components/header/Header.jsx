import { Link } from "react-router-dom";


import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout";

import  logo  from "./rice-bowl-icon.svg"
import "./header.scss"
//LOGO


export default function Header(){

    const {logout} = useLogout();
    const handleLogout = ()=>{
        logout();
    }

    const {user} = useAuthContext();
    return (
        <>
        <div id="header">
            {/* LOGO + BRAND NAMW */}
            <div className="brand">
                <img src={logo} alt="web_logo" />
                <Link className="site-brand" to={'/'}>AlgoRice</Link>
                
            </div>
            
            <div className="navLinks">
            
                {!user? (
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Sign up</Link>
                    </>
                ):(
                    <>
                        <Link onClick={handleLogout} to={'/'}>Logout</Link>
                        <Link to={'/profile'}>Profile</Link>                    
                    </>

                )}
                <Link to={'/about'}>About</Link>
            </div>

        </div>
        </>
    )
}

/*

Items i want

-> Icon + AlgoRice

LINKS 
-> Home 
-> About

AUTH LINKS
-> Register
-> Login 
OR
-> Logout

*/