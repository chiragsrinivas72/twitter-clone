import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CreateAccount_Page_Background from '../images/login_bg.jpg';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';

var main_div_style={
    width:'500px',
    height:'700px',
    position:'absolute',
    left:'700px',
    top:'125px',
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
    top:'30px',
    backgroundColor: '#48494B'
}

var ButtonStyle={
    position:'relative',
    height:'35px',
    width:'200px',
    left:'145px',
    top:'50px',
    backgroundColor:'#63C5DA'
}

var outer_div_style = {
    backgroundImage : `url(${CreateAccount_Page_Background})`,
    backgroundPosition : 'center',
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
    width : '1920px',
    height: '948px',
    margin : '-8px'
}

var LinkStyle={
    position:'relative',
    left:'120px',
    top:'55px',
    textDecoration:'none'
}

var UserNameStyle = {
    position:'relative',
    left:'49px',
    width:'400px',
    backgroundColor: '#48494B',
    top:'10px'
}

var CityStyle = {
    position:'relative',
    left:'49px',
    width:'400px',
    backgroundColor: '#48494B',
    top:'35px'
}

var StateStyle = {
    position:'relative',
    left:'49px',
    width:'400px',
    backgroundColor: '#48494B',
    top:'40px'
}

var CountryStyle = {
    position:'relative',
    left:'49px',
    width:'400px',
    backgroundColor: '#48494B',
    top:'45px'
}

var UploadFileStyle = {
    position:'relative',
    top:'20px',
    left:'50px',
    color:'white'
}

class CreateAccount extends React.Component{
    constructor(props)
    {
        super(props)
        this.CreateAccountHandler=this.CreateAccountHandler.bind(this)
        this.nameHandler=this.nameHandler.bind(this)
        this.emailHandler=this.emailHandler.bind(this)
        this.passwordHandler = this.passwordHandler.bind(this)
        this.usernameHandler = this.usernameHandler.bind(this)
        this.cityHandler=this.cityHandler.bind(this)
        this.stateHandler=this.stateHandler.bind(this)
        this.countryHandler=this.countryHandler.bind(this)
        this.state={
            name: '',
            username:'',
            email:'',
            password:'',
            city:'',
            state:'',
            country:''
        }
    }

    nameHandler(event)
    {
        var name = event.target.value
        this.setState({
            name:name
        })
    }

    cityHandler(event)
    {
        var city = event.target.value
        this.setState({
            city:city
        })
    }

    stateHandler(event)
    {
        var state = event.target.value
        this.setState({
            state:state
        })
    }

    countryHandler(event)
    {
        var country = event.target.value
        this.setState({
            country:country
        })
    }

    usernameHandler(event)
    {
        var username = event.target.value
        this.setState({
            username:username
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
        const form_data = new FormData()
        var input_file_ele = document.getElementById("file-input")
        form_data.append('name',this.state.name)
        form_data.append('username',this.state.username)
        form_data.append('email',this.state.email)
        form_data.append('password',this.state.password)
        form_data.append('image',input_file_ele.files[0])
        form_data.append('city',this.state.city)
        form_data.append('state',this.state.state)
        form_data.append('country',this.state.country)
    
        fetch('http://localhost:5000/accounts',{
          body: form_data,
          method:'POST'
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('token',data.token)
            this.props.history.push('/Home')
        })
        .catch((e) => {
            console.log('e')
        })
    }
    render()
    {
        return (
            <div style = {outer_div_style}>
                <div style={main_div_style}>
                <h1 style={{color:'white',position:'relative',left:'115px'}}>Create an account</h1>
                <form method='post' action='http://localhost:5000/accounts'>
                    <TextField id="outlined-dense" label="Name" margin="dense" variant="outlined" onChange={this.nameHandler} style={NameStyle} color="secondary" name='name' />
                    <TextField id="outlined-dense" label="Username" margin="dense" variant="outlined" onChange={this.usernameHandler} style={UserNameStyle} color="secondary" name='username'/>
                    <TextField id="outlined-dense" label="Email" margin="dense" variant="outlined" onChange={this.emailHandler} style={EmailStyle} color="secondary" name='email'/>
                    <TextField id="outlined-dense" label="Password" type = "password" margin="dense" variant="outlined" onChange={this.passwordHandler} style={PasswordStyle} color="secondary" name='password'/>
                    <TextField id="outlined-dense" label="City" margin="dense" variant="outlined" onChange={this.cityHandler} style={CityStyle} color="secondary" name='city'/>
                    <TextField id="outlined-dense" label="State" margin="dense" variant="outlined" onChange={this.stateHandler} style={StateStyle} color="secondary" name='state'/>
                    <TextField id="outlined-dense" label="Country" margin="dense" variant="outlined" onChange={this.countryHandler} style={CountryStyle} color="secondary" name='country'/>
                    <h3 style={{position:'relative',top:'40px',left:'50px',color:'white'}}>Upload profile picture</h3>
                    <Input type="file" id="file-input" style={UploadFileStyle} name="image"></Input>
                    <Button style={ButtonStyle} variant="contained" color="black" onClick={this.CreateAccountHandler}>SUBMIT</Button>
                    <Link to='/' style={LinkStyle}><h4 style={{color:'white'}}>Already have an account ? Sign in here</h4></Link>
                </form>
                </div>
            </div>
        )
    }
}
export default CreateAccount