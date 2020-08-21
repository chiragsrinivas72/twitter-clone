import React from 'react';
import IndividualTweet from './IndividualTweet';

var TweetsStyle={
    position:'absolute',
    left:'300px',
    top:'350px',
    width:'1000px',
    border:'solid white',
};

class Tweets extends React.Component{

    render()
    {
        return(
            <div style={ this.props.tweetsArray.length!==0 ? TweetsStyle : {display:'none'}}>
                <div style={{marginBottom:'-25px',background:'linear-gradient(to bottom, #0066cc 0%, #a9a9a9 100%)',height:'65px',position:'relative',bottom:'21px'}}>
                    <h2 style={{position:"relative",left:'10px',color:'white',top:'15px'}}>Feed</h2>
                </div>
                <div>
                    {this.props.tweetsArray.map((TweetObject) => 
                    <IndividualTweet  key={TweetObject.tweet_id} 
                        ProfileName={TweetObject.account_name}
                        tweet = {TweetObject.tweet}
                        tweet_id = {TweetObject.tweet_id}
                        getUpdatedTweets={this.props.getUpdatedTweets}
                    />)} 
                </div>
            </div>
        );
    }
}

export default Tweets;