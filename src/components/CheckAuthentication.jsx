import { Outlet, Navigate, useOutletContext } from "react-router-dom"

export default function CheckAuthentication() {
    const localData = JSON.parse(localStorage.getItem('blog-user'));
    const [justLoggedIn] = useOutletContext();
    const date = new Date();

    if(justLoggedIn.value || (localData && Date.parse(localData.expires) >= date.getTime())) {
        return <Outlet />;
    } else {
        localStorage.removeItem('blog-user');
        return <Navigate to="/" replace />;
    }
}