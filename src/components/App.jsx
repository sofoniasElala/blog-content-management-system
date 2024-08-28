import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import '../styles/App.css';
import NavBar from './Navbar';
import { Slide, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [justLoggedIn, setJustLoggedIn] = useState({value: false});

  return (
    <>
    <nav>
      <p>My Blog - <span>Content Management System</span></p>
      {(justLoggedIn.value || localStorage.getItem('blog-user')) && <NavBar justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn}/>}
      <hr />
    </nav>
    <ToastContainer position='top-center' transition={Slide} theme='dark'/>
    <main>
      <Outlet context={[justLoggedIn, setJustLoggedIn]}/>
    </main>
    <footer>Copyright © <span id="date"></span> SofoniasElala  <a href="https://github.com/sofoniasElala/blog-content-management-system"><i className="fa-brands fa-github" style={{color: "#000000"}}></i></a></footer>
    </>
  )
}

export default App
