import React from 'react';
import SideBar from '../components/SideBar.js';
import Button from '@material-ui/core/Button';
import ProfilePicture from '../images/1.png';
import IndividualTweet from './IndividualTweet.js';
import IndividualPerson from './IndividualPerson.js';

var ProfilePictureStyle={
    height:'65px',
    position:'relative',
    left:'80px',
    top:'27px',
    borderRadius:'2rem',
    display:'inline'
};

var FollowButtonStyle={
    backgroundColor:'#63C5DA',
    position:'absolute',
    left:'930px',
    top:'35px'
}

var UnFollowButtonStyle={
    backgroundColor:'red',
    position:'absolute',
    left:'930px',
    top:'35px',
}


class People extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            Following:[],
            People:[]
        };
        this.getPeople = this.getPeople.bind(this)
    }

    getPeople()
    {
        fetch('http://localhost:5000/accounts',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYTAyZDFjMjIyNDM0OTAxNWFiNmQiLCJpYXQiOjE1OTc5Mzk3NTd9.QRel1Y4T5MAcqnSe999gjpQEczbBha4pfJ9U9DxHqSo'
          }
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                People:data
            })
            return(
                fetch('http://localhost:5000/accounts/getFollowing',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYTAyZDFjMjIyNDM0OTAxNWFiNmQiLCJpYXQiOjE1OTc5Mzk3NTd9.QRel1Y4T5MAcqnSe999gjpQEczbBha4pfJ9U9DxHqSo'
                    }
                })
            )
        })
        .then(res => res.json())
        .then((data) => {
            const following = []
            for(var i=0;i<data.length;i++)
            {
                following.push(data[i].user_id)
            }
            this.setState({
                Following:following
            })
        })
        .catch((e) => {
            console.log('e')
        })
            
        .catch((e) => {
            console.log('e')
        })

    }

    componentDidMount(){
        
        this.getPeople()
    }
    render()
    {
        return(
            <div>
                <SideBar />
                <div style={{position:'absolute',left:'300px',width:'1200px'}}>
                    <div style={{border:'solid white',height:'50px'}}>
                        <h1 style={{display:'inline',position:'relative',left:'170px',color:'white',top:'5px'}}>Name</h1>
                        <h1 style={{display:'inline',position:'relative',left:'450px',color:'white',top:'5px'}}>Username</h1>
                    </div>
                    <div style={{border:'solid white',position:'relative',top:'100px',cursor:'pointer'}}>
                        {this.state.People.map((person_obj)=> 
                        <IndividualPerson  key={this.state.People.indexOf(person_obj)} 
                            ButtonStyle={this.state.Following.includes(person_obj.account_id) ? UnFollowButtonStyle : FollowButtonStyle}
                            ButtonValue={this.state.Following.includes(person_obj.account_id) ? "UNFOLLOW" : "FOLLOW"}
                            account_name={person_obj.account_name}
                            getUpdatedPeople={this.getPeople} 
                            account_id={person_obj.account_id}/>)}
                    </div>
                </div>
            </div>    
            
        );
    }

}

export default People;