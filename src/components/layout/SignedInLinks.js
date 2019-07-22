import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  
  return(
     <ul className="navbar-nav ml-auto">
        <li className="nav-item"><NavLink to='/mainGroup' className="nav-link">กลุ่มวิชา</NavLink></li>
        <li className="nav-item"><a href="#" className="nav-link" onClick={props.signOut}>Log Out</a></li>
        <li className="nav-item">
          <span className="badge badge-warning">
            <NavLink to='/' className='nav-link'>{props.profile.initials}</NavLink>
          </span>
        </li>
      </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
  return{
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
