import React from 'react';
import {Link} from 'react-router';

class Email extends React.Component{
    constructor(props){
        super(props);
        var isValid = this.validate(props.value);
        this.state = {value: props.value, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }

    validate(email){
        if (email.indexOf("@") + 1)
            return true;
        return false;
    }

    onChange(e){
        var val = e.target.value;
        var isValid = this.validate(val);
        this.setState({
            value: val,
            valid: isValid
        });
    }

    render(){
        var emailColor= this.state.valid === true ? "blue" : "red";
        return(
            <div>
                <label><b>Email Address</b></label>
                <input type="email" value={this.state.value} placeholder="Enter your email address" onChange={this.onChange} style={{borderColor: emailColor}} required/>
            </div>
        );
    }
}

class Password extends React.Component{
    constructor(props){
        super(props);
        var isValid = this.validate(props.value);
        this.state = {value: props.value, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }

    validate(password){
        return password.length > 6;
    }

    onChange(e){
        var val = e.target.value;
        var isValid = this.validate(val);
        this.setState({
            value: val,
            valid: isValid
        })
    }

    render() {
        var passwordColor = this.state.valid === true ? "blue" : "red";
        return(
            <div>
                <label><b>Password</b></label>
                <input type="password" value={this.state.value} placeholder="Enter your password" onChange={this.onChange} style={{borderColor: passwordColor}} required/>
            </div>
        );
    }
}

export default class UserForm extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        var email = this.refs.emailField.state.value;
        var password = this.refs.passwordField.state.value;
        if(this.refs.emailField.state.valid && this.refs.passwordField.state.valid){
            alert("Email: " + email + " Password: " + password);
        }
    }

    render() {
        return(
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="header">
                    User Login
                </div>

                <div>
                    <div className="username">
                        <Email value="" ref="emailField"/>
                    </div>
                    <div className="password">
                        <Password value="" ref="passwordField"/>
                    </div>
                    <div>
                        <Link to="todolist">
                            <input id="button" type="submit" value="Login"/>
                        </Link>
                        <p id="label">Don`t have an account? <a href="#/register">Register Now</a></p>
                    </div>
                </div>
            </form>
        );
    }
}