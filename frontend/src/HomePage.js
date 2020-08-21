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
      tweetsArray:[]
    }
    this.getTweets = this.getTweets.bind(this)
  }


  getTweets()
  {
    fetch('http://localhost:5000/tweets',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYTAyZDFjMjIyNDM0OTAxNWFiNmQiLCJpYXQiOjE1OTc5Mzk3NTd9.QRel1Y4T5MAcqnSe999gjpQEczbBha4pfJ9U9DxHqSo'
      }
        })
    .then(res=>res.json())
    .then((data)=>{
      this.setState({
        tweetsArray:data
      })
    })
    .catch((e) => {
        console.log('e')
    })
  }

  componentDidMount(){
    this.getTweets()
  }
  render()
  {
    return(
      <div className="App">
        <SideBar />
        <AddTweet getUpdatedTweets={this.getTweets}/>
        <Tweets tweetsArray={this.state.tweetsArray} getUpdatedTweets={this.getTweets}/>
      </div>
    )
  }
}

export default App;
