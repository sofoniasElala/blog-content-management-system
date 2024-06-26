import App from "./components/App"
import LogInForm from "./components/LoginForm"
import HomePage from "./components/HomePage"

 const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <LogInForm />
            }
        ]
    },
    {
        path: "/home",
        element: <App />,
        children: [
            {
                path: "/home",
                element: <HomePage />
            }
        ]
    }
]

export default routes