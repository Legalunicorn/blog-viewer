// //TODO

// import { useSearchParams } from "react-router-dom";

// import {useAuthContext} from "./useAuthContext"

// /*
// basicially this component will check the URL params for jwt
// -> edit the auth context
// -> save to local storage
// -> redirect to the home page
// ??????????????????????
// ??????????????
// ??
// ?
// ?
// ?
// ?
// ?
// ?
// ?
// */

// export default function LoginSuccess(){
//     const {dispatch} = useAuthContext();
//     const [searchParams,setSearchParams] = useSearchParams();
//     const token = searchParams.get("token"); //the JWT
//     console.log("THe token is "+token)
//     //save to local storage
//     localStorage.setItem('user',JSON.stringify(token))
//     //update the auth context 
//     dispatch({type:'LOGIN',payload:token});

// }