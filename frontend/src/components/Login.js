import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

var main_div_style={
    width:'500px',
    height:'380px',
    position:'absolute',
    left:'540px',
    top:'150px',
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
            localStorage.setItem('token',data.token)
            this.props.history.push('/Home')
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
        return(
            <div style={main_div_style}>
                <h1 style={{color:'white',position:'relative',left:'85px'}}>Login to your account</h1>
                <TextField id="outlined-dense" label="Email" margin="dense" variant="outlined" onChange={this.emailHandler} style={EmailStyle} name='email'/>
                <TextField type="password" id="outlined-dense" label="Password" margin="dense" variant="outlined" onChange={this.passwordHandler} style={PasswordStyle} name='password'/>
                <Button style={ButtonStyle} variant="contained" color="black" onClick={this.LoginHandler}>LOGIN</Button>
                <Link to='/CreateAccount' style={LinkStyle}><h4 style={{color:'white'}}>Dont have an account?Create one here</h4></Link>
            </div>
        )
    }
}
export default Login