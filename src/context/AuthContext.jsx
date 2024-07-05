import { createContext,useReducer,useEffect} from "react";

export const AuthContext = createContext();


export const authReducer = (state,action) =>{
    //login and logout cases
    switch(action.type){
        case 'LOGIN':{
            return {user:action.payload}
        }

        case 'LOGOUT':{
            return {user:null}
        }
        default:
            state; //the original state
    }
}


//the AuthContext state encompasses two things
// 1. JWT
// 2. ID

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(authReducer,{
        user:null
    });

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if (user){
            dispatch({type:"LOGIN",payload:JSON.parse(user)})
        }
    },[])

    console.log("Auth context state: ",state)

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}