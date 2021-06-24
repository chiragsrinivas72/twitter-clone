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
      selfID:''
    }
    this.getTweets = this.getTweets.bind(this)
    this.getSelfID = this.getSelfID.bind(this)
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

  getSelfID()
  {
    fetch('http://localhost:5000/selfID',{
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

  componentDidMount() {
    this.getSelfID()
    this.getTweets()
  }
  render()
  {
    return(
      <div className="App" style={{height:'100%'}}>
        <SideBar history={this.props.history} />
        <div style={{position:'absolute',left:'240px',top:'0px',width:'1345px',marginBottom:'180px'}} >
          <AddTweet getUpdatedTweets={this.getTweets}/>
          <Tweets tweetsArray={this.state.tweetsArray} selfID={this.state.selfID} getUpdatedTweets={this.getTweets} />
        </div>
      </div>
    )
  }
}

export default App;