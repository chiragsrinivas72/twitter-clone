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
    bottom:'142px'
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

    render()
    {
        return(
            <div style={IndividualTweetStyle}>
                <img src={ProfilePicture} style={ProfilePictureStyle} alt="user's profile pic"/> 
                <h3 style={ProfileNameStyle}>{this.props.ProfileName}</h3>
                <p style={TextStyle}>{this.props.tweet}</p>
                <span style={LikesStyle_Liked}>&hearts;</span>
                <p style={LikesCountStyle}>{this.props.no_of_likes}</p>

                <DeleteIcon style={this.props.account_id != this.props.selfID ? {visibility:'hidden'} : {position:'relative',bottom:'140px',left:'950px',color:'white',cursor:'pointer'}} onClick={this.DeleteTweet}/>
                <hr style={HorizontalLineStyle}/>
            </div>
        );
    }

}

export default IndividualTweet;