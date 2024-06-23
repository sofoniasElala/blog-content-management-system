import App from "./components/App"
import LogInForm from "./components/loginForm"

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
    }
]

export default routes