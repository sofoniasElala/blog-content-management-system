import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { handleAuth } from '../utils';


export default function NavBar({user, setUser}) {
    return (<>
    <NavLink to="/home">Home</NavLink>
    <button onClick={() => handleAuth(user, setUser)} >Log out</button>
    </>)
}

NavBar.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func
}