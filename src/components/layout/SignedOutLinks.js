import React from 'react'
import { NavLink } from 'react-router-dom'
const SignedOutLinks = () => {
   return(
     <ul className="navbar-nav ml-auto">
        <li className="nav-item"><NavLink className="nav-link" to='/signup'>Signup</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to='/signin'>Login</NavLink></li>
     </ul>
   )
}
export default SignedOutLinks
