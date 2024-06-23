

import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";


export default function Settings(){
    //TODO redirect user from this page if they are not logged in


    const {user} = useAuthContext();
    const navigate = useNavigate();

    if (user===null){
        nagivate('/login');
    }

    return(
        <>
            <p>Settings page. Change your display name</p>
        </>
    )
}