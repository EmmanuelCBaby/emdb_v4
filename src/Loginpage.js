import React, { Component } from 'react';
import './App.css';
import bootstrap from 'bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

class Loginpage extends Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
        }
        this.getusername=this.getusername.bind(this);
        this.getpassword=this.getpassword.bind(this);
        this.loginfunction=this.loginfunction.bind(this);
        this.signupform=this.signupform.bind(this);
    }

    //function to get the username
    getusername(value){
        this.setState({
            username: value
        })
    }

    //function to get the password
    getpassword(event){
        this.setState({
            password:event.target.value
        })
    }

    //function to send the credentials to server for verification
    loginfunction(){
        axios({
            method:'post',
            url:'http://localhost:3001/login',
            data:{
                username:this.state.username,
                password:this.state.password
            },
            withCredentials:true
        })
        .then((obj)=>{
            if(obj.data === 'commonsuccess'){
                swal({
                    title: "Success",
                    text: "You are logged in",
                    icon: "success",
                    button: "Enjoy"
                  })
                  this.props.Signin();
            }
            else if(obj.data === 'adminsuccess'){
                swal({
                    title: "Success",
                    text: "You are logged in",
                    icon: "success",
                    button: "Enjoy"
                  })
                  this.props.adminSignin();
            }
            
        })
        .catch((error)=>{
            swal({
                title: "Warning",
                text: "Invalid Credentials",
                icon: "warning"
              });
            console.log(error);
        })
    }

    //function to render the sign up form
    signupform(){
        this.props.Signup();
    }

    render(){
        var loginform=(
            <div className="Slideshow">
            <header className="App-header">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
            </header>
            <div className="Loginbackground">
                <input type="text" placeholder="Username" className="Username" value={this.state.username} onChange={(event) => this.getusername(event.target.value)}></input>
                <input type="password" placeholder="Password" className="Password" value={this.state.password} onChange={this.getpassword}></input>
                <button className="Loginformbutton" onClick={this.loginfunction}>LOGIN</button>
                <div className="Signuplink" onClick={this.signupform}>
                    New here ? Create an Account.
                </div>
            </div>
            </div>
        )

        return(loginform)        
    }
}

export default Loginpage;