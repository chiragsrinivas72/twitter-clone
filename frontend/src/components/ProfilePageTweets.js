import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProfilePageIndividualTweet from './ProfilePageIndividualTweet'

var ProfilePageTweetsCardStyle={
    position:'absolute',
    left:'20px',
    marginTop:'50px',
    backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
    width:'1000px',
    background: '#BBD2C5',
    background: '-webkit-linear-gradient(to right, #536976, #BBD2C5)',
    background: 'linear-gradient(to right, #536976, #BBD2C5)'
}

class ProfilePageTweets extends React.Component{

    constructor(props)
    {
        super(props)
        this.TweetLikedByLoggedInUserOrNot = this.TweetLikedByLoggedInUserOrNot.bind(this)
    }

    TweetLikedByLoggedInUserOrNot(liked_by)
    {
        for (var i = 0; i < liked_by.length; i++)
        {
            if (liked_by[i].user_id.toString() == this.props.selfID.toString())
            {
                return(true)
            }    
        }
        return(false)
    }

    render()
    {
        return(
            <Card style={ProfilePageTweetsCardStyle}>
                <CardContent>
                    <h1 style={{position:'relative',display:'inline',color:'white',left:'200px',cursor:'pointer'}} onClick={this.props.typeOfTweetsToShowHandler}>Tweets</h1>
                    <h1 style={{position:'relative',display:'inline',color:'white',left:'500px',cursor:'pointer'}} onClick={this.props.typeOfTweetsToShowHandler}>Liked Tweets</h1>
                    <hr style={{position:'relative',width:'1000px',right:'18px',top:'25px'}}></hr>
                    <div style={{position:'relative',top:'25px'}}>
                    {this.props.tweetsArray.map((TweetObject) => 
                        <ProfilePageIndividualTweet  key={TweetObject.tweet_id} 
                            ProfileName={TweetObject.account_name}
                            tweet = {TweetObject.tweet}
                            tweet_id={TweetObject.tweet_id}
                            account_id={TweetObject.account_id}  
                            selfID = {this.props.selfID}
                            no_of_likes={TweetObject.no_of_likes}
                            likedByUser = {this.TweetLikedByLoggedInUserOrNot(TweetObject.liked_by)} 
                            getUpdatedTweets={this.props.getProfile}
                            tweet_date={TweetObject.tweet_date}
                            account_img_src={TweetObject.account_img_src}
                        />)} 
                </div>
                </CardContent>
            </Card>
        )
    }
}

export default ProfilePageTweets