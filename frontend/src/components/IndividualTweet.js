import React from 'react';
import ProfilePicture from '../images/1.png';
import DeleteIcon from '@material-ui/icons/Delete';

var ProfilePictureStyle={
    height:'65px',
    position:'relative',
    left:'10px',
    top:'10px',
    borderRadius:'2rem'
};

var ProfileNameStyle={
    position:'relative',
    left:'100px',
    bottom:'80px',
    color:'white',
    
};

var TextStyle={
    position:'relative',
    left:'100px',
    bottom:'80px',
    color:'white'
};

var IndividualTweetStyle={
    height:'123px',
    marginTop:'20px',
};

var HorizontalLineStyle={
    width:'998px',
    position:'relative',
    bottom:'190px'
};

var LikesStyle_Unliked={
    position:'relative',
    bottom:'65px',
    left:'100px',
    cursor:'pointer',
    color:'white'
}

var LikesStyle_Liked={
    position:'relative',
    bottom:'65px',
    left:'100px',
    cursor:'pointer',
    color:'red'
}


var LikesCountStyle={
    position:'relative',
    left:'115px',
    bottom:'98px',
    color:'white'
}


class IndividualTweet extends React.Component{
    constructor(props)
    {
        super(props)
        this.DeleteTweet = this.DeleteTweet.bind(this)
        this.LikeHandler = this.LikeHandler.bind(this)
        this.state = {
            liked:this.props.likedByUser
        }
    }

    DeleteTweet()
    {
        var tweet_id = String(this.props.tweet_id)
        fetch('http://localhost:5000/tweets/'+tweet_id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage['token']
              },
              method:'DELETE'
        })
        .then(res => res.json())
        .then((data)=>{
            this.props.getUpdatedTweets()
        })
        .catch(e=>console.log('e'))
    }

    LikeHandler()
    {
        var tweet_id = String(this.props.tweet_id)
        if (this.state.liked == false)
        {
            fetch('http://localhost:5000/LikeTweet/'+tweet_id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage['token']
              },
              method:'PATCH'
            })
            .then(res => res.json())
                .then((data) => {
                this.setState({liked:true})
                this.props.getUpdatedTweets()
            })
            .catch(e=>console.log('e'))
        }
        else
        {   console.log('unliked')
            fetch('http://localhost:5000/UnlikeTweet/'+tweet_id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + localStorage['token']
              },
              method:'PATCH'
            })
            .then(res => res.json())
                .then((data) => {
                this.setState({liked:false})
                this.props.getUpdatedTweets()
            })
            .catch(e=>console.log('e'))
        }
        
    }

    DifferenceInDate(tweet_date)
    {
        var current_date = new Date()
        var current_date_year = current_date.getFullYear()
        var current_date_month = current_date.getMonth()
        var current_date_day = current_date.getDay()
        var current_date_hours = current_date.getHours()
        var current_date_minutes = current_date.getMinutes()
        var current_date_seconds = current_date.getSeconds()

        var tweet_date_temp = new Date(tweet_date)
        var tweet_date_temp_year = tweet_date_temp.getFullYear()
        var tweet_date_temp_month = tweet_date_temp.getMonth()
        var tweet_date_temp_day = tweet_date_temp.getDay()
        var tweet_date_temp_hours = tweet_date_temp.getHours()
        var tweet_date_temp_minutes = tweet_date_temp.getMinutes()
        var tweet_date_temp_seconds = tweet_date_temp.getSeconds()

        var result = ""

        if(current_date_year!=tweet_date_temp_year)
        {
            result+=String(current_date_year-tweet_date_temp_year)
            result+="y"
            return result
        }
        if(current_date_month!=tweet_date_temp_month)
        {
            result+=String(current_date_month-tweet_date_temp_month)
            result+="m"
            return result
        }
        if(current_date_day!=tweet_date_temp_day)
        {
            result+=String(current_date_day-tweet_date_temp_day)
            result+="d"
            return result
        }
        if(current_date_hours!=tweet_date_temp_hours)
        {
            result+=String(current_date_hours-tweet_date_temp_hours)
            result+="h"
            return result
        }
        if(current_date_minutes!=tweet_date_temp_minutes)
        {
            result+=String(current_date_minutes-tweet_date_temp_minutes)
            result+="m"
            return result
        }
        if(current_date_seconds!=tweet_date_temp_seconds)
        {
            result+=String(current_date_seconds-tweet_date_temp_seconds)
            result+="s"
            return result
        }
        return "0s"
    }

    render()
    {
        return(
            <div style={IndividualTweetStyle}>
                <img src={ProfilePicture} style={ProfilePictureStyle} alt="user's profile pic"/> 
                <h3 style={ProfileNameStyle}>{this.props.ProfileName}</h3>
                <p style={TextStyle}>{this.props.tweet}</p>
                <span style={this.state.liked==true ? LikesStyle_Liked : LikesStyle_Unliked} onClick={this.LikeHandler}>&hearts;</span>
                <p style={LikesCountStyle}>{this.props.no_of_likes}</p>
                <h6 style={{color:'white',position:'relative',bottom:'240px','left':'953px'}}>{this.DifferenceInDate(this.props.tweet_date)}</h6>
                <DeleteIcon style={this.props.account_id != this.props.selfID ? {visibility:'hidden'} : {position:'relative',bottom:'190px',left:'950px',color:'white',cursor:'pointer'}} onClick={this.DeleteTweet}/>
                <hr style={HorizontalLineStyle}/>
            </div>
        );
    }

}

export default IndividualTweet;