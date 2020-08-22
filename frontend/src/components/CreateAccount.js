import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var main_div_style={
    width:'500px',
    height:'500px',
    position:'absolute',
    left:'540px',
    top:'150px',
    backgroundColor:'#292929',
    borderRadius:'0.7rem'
}

var NameStyle ={
    position:'relative',
    left:'49px',
    width:'400px',
    backgroundColor:'#48494B'
}

var UserNameStyle={
    position:'relative',
    left:'49px',
    width:'400px',
    top:'20px',
    backgroundColor:'#48494B'
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


class CreateAccount extends React.Component{
    constructor(props)
    {
        super(props)
        this.CreateAccountHandler=this.CreateAccountHandler.bind(this)
        this.nameHandler=this.nameHandler.bind(this)
        this.emailHandler=this.emailHandler.bind(this)
        this.passwordHandler=this.passwordHandler.bind(this)
        this.state={
            name:'',
            email:'',
            password:''
        }
    }

    nameHandler(event)
    {
        var name = event.target.value
        this.setState({
            name:name
        })
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

    CreateAccountHandler()
    {
        fetch('http://localhost:5000/accounts',{
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name:this.state.name,
              email:this.state.email,
              password:this.state.password
          }),
          method:'POST'
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch((e) => {
            console.log('e')
        })
    }
    render()
    {
        return(
            <div style={main_div_style}>
                <h1 style={{color:'white',position:'relative',left:'115px'}}>Create an account</h1>
                <form method='post' action='http://localhost:5000/accounts'>
                    <TextField id="outlined-dense" label="Name" margin="dense" variant="outlined" onChange={this.nameHandler} style={NameStyle} name='name'/>
                    <TextField id="outlined-dense" label="Email" margin="dense" variant="outlined" onChange={this.emailHandler} style={EmailStyle} name='email'/>
                    <TextField id="outlined-dense" label="Password" margin="dense" variant="outlined" onChange={this.passwordHandler} style={PasswordStyle} name='password'/>
                    <Button style={ButtonStyle} variant="contained" color="black" onClick={this.CreateAccountHandler}>SUBMIT</Button>
                </form>
            </div>
        )
    }
}
export default CreateAccount