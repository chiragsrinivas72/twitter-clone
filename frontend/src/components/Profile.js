import React from 'react';
import SideBar from './SideBar.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FollowingFollowersCard from './FollowingFollowersCard';
import ProfilePageTweets from './ProfilePageTweets.js'

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
            selfID:"",                      //logged in user's account_id
            following_follower_type : "",
            //everything below is for the account of the profile being viewed
            account_username:"",
            account_name:"",
            account_followers:[],
            account_following:[],
            account_img_src:"",
            account_tweets:[],
            account_liked_tweets:[],
            account_city:'',
            account_state:'',
            account_country:'',
            type:'own_tweets'
        }
        this.FollowingFollowerTypeHandler=this.FollowingFollowerTypeHandler.bind(this)
        this.ClearFollowingFollowersCardHandler=this.ClearFollowingFollowersCardHandler.bind(this)
        this.getProfile=this.getProfile.bind(this)
        this.getSelfIDAndImgSrc=this.getSelfIDAndImgSrc.bind(this)
        this.typeOfTweetsToShowHandler=this.typeOfTweetsToShowHandler.bind(this)
    }

    getSelfIDAndImgSrc()
    {
        fetch('http://localhost:5000/selfIDAndImgSrc',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + localStorage['token']
        }
            })
        .then(res=>res.json())
        .then((data)=>{
        this.setState({
            selfID: data.selfID
        })
        })
        .catch((e) => {
            console.log('e')
        })
    }

    getProfile()
    {
        fetch('http://localhost:5000/accounts/'+this.props.match.params.id,{
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
                account_img_src:data.account_img_src,
                account_city:data.account_city,
                account_state:data.account_state,
                account_country:data.account_country
            })
            return(
                fetch('http://localhost:5000/selfAndLikedTweets/'+this.props.match.params.id,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer ' + localStorage['token']
                    }
                })
            )
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                account_tweets:data.self_tweets,
                account_liked_tweets:data.liked_tweets
            })
            //being called infinitely if this.getPeople() is in render().idk why.check later
            //console.log(this.state)
        })
        .catch((e) => {
            console.log('e')
        })
    }

    componentDidMount(event)
    {
        this.getProfile()
        this.getSelfIDAndImgSrc()
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

    typeOfTweetsToShowHandler(event)
    {
        var chosen_option = event.target.innerHTML
        if(chosen_option=="Liked Tweets")
        {
            this.setState({
                type:'liked_tweets'
            })
        }
        else
        {
            this.setState({
                type:'own_tweets'
            })
        }
    }

    render()
  {
    //this.getProfile()
    return(
      <div className="App" style={{height:'100%'}}>
        <SideBar history={this.props.history} self_account_id={this.state.selfID}/>
        <div style={{position:'absolute',left:'240px',top:'0px',width:'1345px',marginBottom:'180px'}} >
            <Card style={ProfileCardStyle}>
                <CardContent>
                    <img src={this.state.account_img_src} 
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="http://localhost:5000/image/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
                        }} 
                    style={ProfilePictureStyle}></img>
                    <h1 style={{color:'white',position:'relative',left:'263px',bottom:'70px'}}>{this.state.account_name}</h1>
                    <h3 style={{color:'white',position:'relative',left:'263px',bottom:'90px'}}>{"@"+this.state.account_username}</h3>
                    <LocationOnIcon style={{position:'relative',left:'260px',bottom:'70px'}}></LocationOnIcon>
                    <h3 style={{color:'white',position:'relative',left:'290px',bottom:'115px'}}>{this.state.account_city+', '+this.state.account_state+', '+this.state.account_country}</h3>
                    <h3 style={FollowingInProfileCardStyle} onClick={this.FollowingFollowerTypeHandler}>{this.state.account_following.length +" Following"}</h3>
                    <h3 style={FollowersInProfileCardStyle} onClick={this.FollowingFollowerTypeHandler}>{this.state.account_followers.length +" Followers"}</h3>
                </CardContent>
            </Card>
            <FollowingFollowersCard type={this.state.following_follower_type} ClearFollowingFollowersCardHandler={this.ClearFollowingFollowersCardHandler}
                following_or_follower_data={this.state.following_follower_type=="Following" ? this.state.account_following : this.state.account_followers}
            />
            <ProfilePageTweets tweetsArray={this.state.type==="own_tweets" ? this.state.account_tweets : this.state.account_liked_tweets} selfID = {this.state.selfID} getProfile={this.getProfile} typeOfTweetsToShowHandler={this.typeOfTweetsToShowHandler}/>
        </div>
      </div>
    )
  }
}

export default Profile