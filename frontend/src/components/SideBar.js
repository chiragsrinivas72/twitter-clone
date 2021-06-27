import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';

var SideBarStyle={
    backgroundColor:'#000000',
    height:'1000px',
    width:'240px',
    position:'absolute',
    left:'0px',
    top:'0px',
    position:'fixed'
};

class SideBar extends React.Component{
    constructor(props)
    {
        super(props)
        this.Logout=this.Logout.bind(this)
    }

    Logout()
    {
        fetch('http://localhost:5000/accounts/logout',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage['token']
            },
            method:'POST'
        })
        .then(res=>res.json())
        .then((data)=>{
            localStorage.setItem('token','')
            this.props.history.push('/')
        })
        .catch((e) => {
            console.log('e')
        })
    }

    render()
    {
        return(
            <div style={SideBarStyle}>
                <h2 style={{color:'white',position:'relative',left:'80px'}}>Twitter</h2>
                <hr style={{position:'relative',bottom:'4px'}}/>
                <div style={{position:'relative',top:'15px'}}>

                    <Link to="/Home" style={{ textDecoration: 'none' }}>
                        <div style={{cursor:'pointer'}}>
                            <HomeIcon style={{color:'white',display:'inline',position:'relative',left:'25px',top:'5px'}}/>
                            <h3 style={{color:'white',position:'relative',left:'58px',display:'inline'}}>Home</h3>
                        </div>
                    </Link>

                    <Link to="/people" style={{ textDecoration: 'none' }}> 
                        <div style={{position:'relative',top:'30px',cursor:'pointer'}}>
                            <PeopleIcon style={{color:'white',display:'inline',position:'relative',left:'25px',top:'5px'}}/>
                            <h3 style={{color:'white',position:'relative',left:'58px',display:'inline'}}>People</h3>
                        </div>
                    </Link>
                    
                    <hr style={{position:'relative',top:'60px'}}/>
                        
                </div>
                <Link to={"/profile/"+this.props.self_account_id} style={{ textDecoration: 'none' }}>
                    <div style={{position:'relative',top:'100px',cursor:'pointer'}}>
                        <div>
                            <AccountCircleIcon style={{color:'white',display:'inline',position:'relative',left:'25px',top:'5px'}}/>
                            <h3 style={{color:'white',position:'relative',left:'58px',display:'inline'}}>Profile</h3>
                        </div>
                    </div>
                </Link>
                <div style={{position:'relative',top:'700px',cursor:'pointer'}} onClick={this.Logout}>
                    <div>
                        <h3 style={{color:'white',position:'relative',left:'75px',display:'inline'}}>Logout</h3>
                    </div>
                </div>   
            </div>
        )
    }
}

export default SideBar;