

export default function Login(){
    return (
        <>
            <p>Hi</p>
            <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>Log in with google</a>
        </>
    )
}
//BUG workflow from google auth
/*
redirect to backend URL
-> authenticate

backend redirects to FRONTEND : Home 

-> ??
-> 
*/

/*
When you login with google
-> 
param.token => jwt
=> redirects us to the home paged
=> the home page on load -> ??

-> check the params?

WHAT IS THE PROBLEM

?
- redirect -> has jwt token in params

what we would do if redirect to home page
-> get the jwt token 
-> if jwt token 
-> set the dispatch auth context 
-> login : user: jwt 

*/