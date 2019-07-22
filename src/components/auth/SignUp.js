import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.signUp(this.state)
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0;
    }

    render() {
        const{ authError, auth } = this.props
        if(auth.uid) return <Redirect to='/' />

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    />
                </FormGroup>
                <FormGroup controlId="firstName" bsSize="large">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                    autoFocus
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                    autoFocus
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    />
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    SignUp
                </Button>
                <div className="red-text center">
                    { authError ? <p>{ authError }</p> : null }
                </div>
                </form>
            </div>        
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

// export default SignUp
