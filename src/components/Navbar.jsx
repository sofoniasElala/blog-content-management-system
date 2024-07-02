import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import { handleAuth } from '../utils';


export default function NavBar({ justLoggedIn, setJustLoggedIn }) {
    return (<>
    <NavLink to="/home">Home</NavLink>
    <button onClick={ () =>  handleAuth(justLoggedIn, setJustLoggedIn, false) } >Log out</button>
    </>)
}

NavBar.propTypes = {
    justLoggedIn: PropTypes.object,
    setJustLoggedIn: PropTypes.func
}