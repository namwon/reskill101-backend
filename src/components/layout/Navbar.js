import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props
  // console.log(auth)
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container collapse navbar-collapse">
        <Link to='/' className='navbar-brand'>ReSkill101</Link>
        {/* <SignedInLinks />
        <SignedOutLinks /> */}
        { links }
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}
export default connect(mapStateToProps)(Navbar)
