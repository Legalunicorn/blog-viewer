import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


// we could just use 'UseContext" in our normal componenets
// to access the auth context
// this hook just makes it so that you only have to import one item instead of two


export const useAuthContext = () =>{
    const context = useContext(AuthContext); //returns state and displatch
    //check we have access to context




    if (!context){
        throw Error("Auth context accessed outside of scope.")
    }
    return context;

}

//when using, destructure it as such 
// const {auth, dispatch } = useAuthContext();

// ... use it
// ...
//      dispatch({type:"LOG_OUT",payload:...})