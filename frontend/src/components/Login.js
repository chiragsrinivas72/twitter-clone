import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Login_Page_Background from '../images/login_bg';

var main_div_style={
    width:'500px',
    height:'380px',
    position:'absolute',
    left:'180px',
    top:'175px',
    backgroundColor:'#292929',
    borderRadius:'0.7rem'
}

var EmailStyle={
    position:'relative',
    left:'49px',
    width:'400px',
    top:'20px',
    backgroundColor:'#48494B'
}

var PasswordStyle={
    position:'relative',
    left:'49px',
    width:'400px',
    top:'40px',
    backgroundColor:'#48494B'
}

var ButtonStyle={
    position:'relative',
    height:'35px',
    width:'200px',
    left:'145px',
    top:'90px',
    backgroundColor:'#63C5DA'
}

var LinkStyle={
    position:'relative',
    left:'120px',
    top:'95px',
    textDecoration:'none'
}

var outer_div_style = {
    backgroundImage : `url(${Login_Page_Background})`,
    backgroundPosition : 'center',
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
    width : '1600px',
    height: '769px',
    margin : '-8px'
}

var failed_login_style = {
    color: 'red',
    position: 'absolute',
    left: '80px',
    top: '215px',
    visibility:'hidden'
}


class Login extends React.Component{
    constructor(props)
    {
        super(props)
        this.LoginHandler=this.LoginHandler.bind(this)
        this.emailHandler=this.emailHandler.bind(this)
        this.passwordHandler=this.passwordHandler.bind(this)
        this.state={
            email:'',
            password:''
        }
        this.login_ref = React.createRef();
    }

    emailHandler(event)
    {
        var email = event.target.value
        this.setState({
            email:email
        })
    }

    passwordHandler(event)
    {
        var password = event.target.value
        this.setState({
            password:password
        })
    }

    LoginHandler()
    {
        fetch('http://localhost:5000/accounts/login',{
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email:this.state.email,
              password:this.state.password
          }),
          method:'POST'
        })
        .then(res => res.json())
            .then((data) => {
            if(data.ErrorMessage)
            {
                this.login_ref.current.style.visibility = "visible"
            }
            else
            {
                localStorage.setItem('token', data.token)
                this.props.history.push('/Home')
            }
            
        })
        .catch((e) => {
            console.log('e')
        })
    }

    componentWillMount()
    {
        if(localStorage['token'])
        {
            
            this.props.history.push('/Home')
        }
    }

    render()
    {
        return (
            <div style={outer_div_style}>
                <div style={main_div_style} className="w3-container">
                    <h1 style={{color:'white',position:'relative',left:'90px'}}>Login to your account</h1>
                    <TextField id="outlined-dense" label="Email" margin="dense" variant="outlined" onChange={this.emailHandler} style={EmailStyle} color="secondary" name='email'/>
                    <TextField type="password" id="outlined-dense" label="Password" margin="dense" variant="outlined" onChange={this.passwordHandler} style={PasswordStyle} color="secondary" name='password'/>
                    <h4 className="w3-center w3-animate-top" ref={this.login_ref} style={failed_login_style}>Please enter the correct email and password!</h4>
                    <Button style={ButtonStyle} variant="contained" color="black" onClick={this.LoginHandler}>LOGIN</Button>
                    <Link to='/CreateAccount' style={LinkStyle}><h4 style={{color:'white'}}>Dont have an account ? Create one here</h4></Link>
                </div>
            </div>
        )
    }
}
export default Login