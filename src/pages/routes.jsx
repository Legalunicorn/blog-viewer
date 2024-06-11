// just to store all the routing information

//Layout components
import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
// import LoginSucess from "../components/l"


//Pages for routes
import Home from "./home/Home.jsx";
import Login from "./login/Login"
import ArticlePage from "./ArticlePage/ArticlePage.jsx"

//context
// import {useAuthContext} from "../hooks/useAuthContext.js"


//react
import {
    createBrowserRouter,
    Outlet,
    Navigate
} from "react-router-dom";

// import LoginSuccess from "../hooks/useLoginSuccess.js";



function Layout(){
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    )
}

// const {user} = useAuthContext();

const router = createBrowserRouter([
    {
        element:<Layout/>,
        //TODO errorElement: <ErrorPage />,
        children:[
            {
                path: '/',
                element: <Home/>,//TODO
                children:[
                    {
                        path: '/articles/:id',
                        element: <ArticlePage/>
                    }
                ]
            },
            {
                path: '/login',
                element: <Login/>,

            }
        ]
    }
])

export default router