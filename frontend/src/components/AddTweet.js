import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ProfilePicture from '../images/1.png'

var AddTweetStyle={
    position:'relative',
    left:'160px',
    border:'solid white',
    width:'1000px',
    top:'63px',
    height: '200px'

};

var HorizontalLineStyle={
    width:'998px',
    position:'relative',
    right:'0px',
    bottom:'29px'
};

var TweetButtonStyle={
    position:'relative',
    right:'435px',
    top:'5px',
    backgroundColor:'#63C5DA'
}

var ProfilePictureStyle={
    height:'65px',
    width:'60px',
    position:'relative',
    left:'10px',
    borderRadius:'2rem'
};

var TweetBoxStyle={
    position:'relative',
    bottom:'0px',
    width:'850px',
    left:'40px',
    
};

class AddTweet extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            tweet: "",
            no_of_likes:0
        };
        this.TweetHandler = this.TweetHandler.bind(this);
        this.AddTweetHandler = this.AddTweetHandler.bind(this)
    }

    TweetHandler(event)
    {
        let tweet=event.target.value;
        this.setState({tweet:tweet});
    }

    AddTweetHandler()
    {
        fetch('http://localhost:5000/tweets',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + localStorage['token']
          },
          body: JSON.stringify({
              tweet: this.state.tweet,
              no_of_likes:this.state.no_of_likes,
              tweet_date:new Date()
          }),
          method:'POST'
        })
        .then(res => res.json())
        .then((data) => {
            this.props.getUpdatedTweets()
            this.setState({tweet:''})
        })
        .catch((e) => {
            console.log('e')
        })   
    }

    render()
    {
        return(
        <div style={AddTweetStyle}>
            <div style={{background:'linear-gradient(to bottom, #0066cc 0%, #a9a9a9 100%)',height:'65px',position:'relative',bottom:'20px'}}>
                <h2 style={{position:"relative",left:'10px',color:'white',top:'15px'}}>Tweet</h2>
            </div>
            <hr style={HorizontalLineStyle}/>
            <img src={this.props.selfImgSrc} 
                onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="http://localhost:5000/image/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
                        }} 
                style={ProfilePictureStyle} alt="users's profile pic"/>
            <TextField id="standard-basic" placeholder="What's happening?" value={this.state.tweet} style={TweetBoxStyle} onChange={this.TweetHandler}/>
            <Button variant="contained" color="primary" onClick={this.AddTweetHandler} style={TweetButtonStyle}>Tweet</Button>
        </div>
        );
    }
}

export default AddTweet;