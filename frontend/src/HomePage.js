import React from 'react';
import AddTweet from './components/AddTweet';
import Tweets from './components/Tweets';
import SideBar from './components/SideBar.js';

var Tweetid=0;

class App extends React.Component{
  constructor(props)
  {
    super(props)
    this.state={
      tweetsArray: [],
      selfID:'',
      selfImgSrc:''
    }
    this.getTweets = this.getTweets.bind(this)
    this.getSelfIDAndImgSrc = this.getSelfIDAndImgSrc.bind(this)
  }

  getTweets()
  {
    fetch('http://localhost:5000/tweets',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + localStorage['token']
      }
        })
    .then(res=>res.json())
    .then((data)=>{
      this.setState({
        tweetsArray: data
      })
    })
    .catch((e) => {
        console.log('e')
    })
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
        selfID: data.selfID,
        selfImgSrc:data.img_src
      })
    })
    .catch((e) => {
        console.log('e')
    })
  }

  componentDidMount() {
    this.getSelfIDAndImgSrc()
    this.getTweets()
  }

  render()
  {
    return(
      <div className="App" style={{height:'100%'}}>
        <SideBar history={this.props.history} self_account_id={this.state.selfID}/>
        <div style={{position:'absolute',left:'240px',top:'0px',width:'1345px',marginBottom:'180px'}} >
          <AddTweet getUpdatedTweets={this.getTweets} selfImgSrc={this.state.selfImgSrc}/>
          <Tweets tweetsArray={this.state.tweetsArray} selfID={this.state.selfID} getUpdatedTweets={this.getTweets}/>
        </div>
      </div>
    )
  }
}

export default App;
