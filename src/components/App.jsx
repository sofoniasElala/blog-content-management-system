import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import '../styles/App.css';
import NavBar from './Navbar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
    <nav>
      <p>Blog - CMS</p>
      {user && <NavBar user={user} setUser={setUser} />}
    </nav>
    <Outlet context={[user, setUser]}/>
    </>
  )
}

export default App
