import App from "./components/App"
import LogInForm from "./components/LoginForm"
import HomePage from "./components/HomePage"
import CreatePost from "./components/CreatePost"
import CheckAuthentication from "./components/CheckAuthentication"
import AllPosts from "./components/AllPosts"
import { redirect } from "react-router-dom"

const loggedInUserReRouter = () => {
    const localData = localStorage.getItem('blog-user');
    if (localData) {
      return redirect("/home");
    }
    return null;
  };

 const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                loader: loggedInUserReRouter,
                element: <LogInForm />
            },
            {
                path: "/home",
                element: <CheckAuthentication />,
                children: [
                    {
                        path: "/home",
                        element: <HomePage />
                    },
                    {
                        path: "posts/",
                        element: <AllPosts />
                    },
                    {
                        path: "posts/create",
                        element: <CreatePost />
                    }
                ]
            }
        ]
    },
]

export default routes