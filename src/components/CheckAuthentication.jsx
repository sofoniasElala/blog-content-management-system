import { Outlet, Navigate, useOutletContext } from "react-router-dom"

export default function CheckAuthentication() {
    const localData = JSON.parse(localStorage.getItem('blog-user'));
    const [user] = useOutletContext();
    const date = new Date();

    if(user || (localData && localData.expires >= date.getTime())) {
        return <Outlet />;
    } else {
        localStorage.removeItem('blog-user');
        return <Navigate to="/" replace />;
    }
}