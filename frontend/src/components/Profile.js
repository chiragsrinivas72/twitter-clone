import React from 'react';
import SideBar from './SideBar.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FollowingFollowersCard from './FollowingFollowersCard';

var ProfileCardStyle={
    position:'relative',
    top:'20px',
    left:'20px',
    backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
    height:'250px',
    width:'1000px'
}

var ProfilePictureStyle={
    height:'100px',
    position:'relative',
    width:'100px',
    left:'60px',
    top:'50px',
    borderRadius:'3rem'
};

var FollowingInProfileCardStyle={
    color:'white',
    position:'relative',
    left:'763px',
    bottom:'230px',
    cursor:'pointer',
    color:'black'
}

var FollowersInProfileCardStyle={
    color:'white',
    position:'relative',
    left:'763px',
    bottom:'230px',
    cursor:'pointer',
    color:'black'
}

class Profile extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            following_follower_type : "",
            account_username:"",
            account_name:"",
            account_followers:[],
            account_following:[],
            account_img_src:""
        }
        this.FollowingFollowerTypeHandler=this.FollowingFollowerTypeHandler.bind(this)
        this.ClearFollowingFollowersCardHandler=this.ClearFollowingFollowersCardHandler.bind(this)
        this.getSelfProfile=this.getSelfProfile.bind(this)
    }

    getSelfProfile()
    {
        fetch('http://localhost:5000/accounts/me',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + localStorage['token']
          }
        })
        .then(res => res.json())
            .then((data) => {
            this.setState({
                account_username:data.account_username,
                account_name:data.account_name,
                account_following:data.account_following,
                account_followers:data.account_followers,
                account_img_src:data.account_img_src
            })
        })
        .catch((e) => {
            console.log('e')
        })
    }

    componentDidMount(event)
    {
        this.getSelfProfile()
    }

    FollowingFollowerTypeHandler(event)
    {
        var type = event.target.innerHTML.split(" ")[1]
        this.setState({
            following_follower_type:type
        })
    }

    ClearFollowingFollowersCardHandler(event)
    {
        this.setState({
            following_follower_type:""
        })
    }

    render()
  {
    return(
      <div className="App" style={{height:'100%'}}>
        <SideBar history={this.props.history} />
        <div style={{position:'absolute',left:'240px',top:'0px',width:'1345px',marginBottom:'180px'}} >
            <Card style={ProfileCardStyle}>
                <CardContent>
                    <img src={this.state.account_img_src} style={ProfilePictureStyle}></img>
                    <h1 style={{color:'white',position:'relative',left:'263px',bottom:'70px'}}>{this.state.account_name}</h1>
                    <h3 style={{color:'white',position:'relative',left:'263px',bottom:'90px'}}>{"@"+this.state.account_username}</h3>
                    <LocationOnIcon style={{position:'relative',left:'260px',bottom:'70px'}}></LocationOnIcon>
                    <h3 style={{color:'white',position:'relative',left:'290px',bottom:'115px'}}>Bengaluru,Karnataka,India</h3>
                    <h3 style={FollowingInProfileCardStyle} onClick={this.FollowingFollowerTypeHandler}>{this.state.account_following.length +" Following"}</h3>
                    <h3 style={FollowersInProfileCardStyle} onClick={this.FollowingFollowerTypeHandler}>{this.state.account_followers.length +" Followers"}</h3>
                </CardContent>
            </Card>
            <FollowingFollowersCard type={this.state.following_follower_type} ClearFollowingFollowersCardHandler={this.ClearFollowingFollowersCardHandler}
                following_or_follower_data={this.state.following_follower_type=="Following" ? this.state.account_following : this.state.account_followers}
            />
        </div>
      </div>
    )
  }
}

export default Profile