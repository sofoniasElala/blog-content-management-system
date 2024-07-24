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
      <p>Blog - CMS</p>
      {(justLoggedIn.value || localStorage.getItem('blog-user')) && <NavBar justLoggedIn={justLoggedIn} setJustLoggedIn={setJustLoggedIn}/>}
    </nav>
    <ToastContainer position='top-center' transition={Slide} theme='dark'/>
    <main>
      <Outlet context={[justLoggedIn, setJustLoggedIn]}/>
    </main>
    </>
  )
}

export default App
