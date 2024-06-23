// just to store all the routing information

//Layout components
import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
// import LoginSucess from "../components/l"


//Pages for routes
import Home from "./home/Home.jsx";
import Login from "./login/Login"
import ArticlePage from "./ArticlePage/ArticlePage.jsx"
import Signup from "./signup/Signup.jsx";
import TagPage from "./tagPage/TagPage.jsx";

//context


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
            <div id="main">
                <Outlet />
            </div>
            
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
            },
            {
                path: '/login',
                element: <Login/>,

            },
            {
                path: '/articles/:id',
                element:<ArticlePage/>
            }
            ,
            {
                path:"/articles/tags/:id",
                element: <TagPage/>
            }
            ,
            {
                path:'/signup',
                element:<Signup/>
            }
        ]
    }
])

export default router