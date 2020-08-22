import React from 'react';
import ProfilePicture from '../images/1.png';
import Button from '@material-ui/core/Button';
import IndividualTweet from './IndividualTweet';

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
    top:'35px'
}

class IndividualPerson extends React.Component{
    
    constructor(props)
    {
        super(props)
        this.ChangeBackground=this.ChangeBackground.bind(this)
        this.ChangeBackgroundBack=this.ChangeBackgroundBack.bind(this)
        this.FollowOrUnFollowHandler=this.FollowOrUnFollowHandler.bind(this)
    }

    ChangeBackground(event)
    {
        if(event.target.nodeName!=='H2' && event.target.nodeName!=='BUTTON' && event.target.nodeName!=='SPAN')
        {
            event.target.style.backgroundColor='#525252';
        }
    }
    ChangeBackgroundBack(event)
    {
        if(event.target.nodeName!=='H2' && event.target.nodeName!=='BUTTON' && event.target.nodeName!=='SPAN')
        {
            event.target.style.backgroundColor='#212121';
        }
    }
    FollowOrUnFollowHandler(event)
    {
        if(event.target.innerHTML=='FOLLOW')
        {
            const id = String(this.props.account_id)
            fetch('http://localhost:5000/accounts/addFollowing/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYTAyZDFjMjIyNDM0OTAxNWFiNmQiLCJpYXQiOjE1OTc5Mzk3NTd9.QRel1Y4T5MAcqnSe999gjpQEczbBha4pfJ9U9DxHqSo'
                },
                method:'PATCH'
            })
            .then(res=>res.json())
            .then((data)=>{
                this.props.getUpdatedPeople()
            })
            .catch((e)=>console.log('e'))
        }
        else
        {
            const id = String(this.props.account_id)
            fetch('http://localhost:5000/accounts/removeFollowing/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYTAyZDFjMjIyNDM0OTAxNWFiNmQiLCJpYXQiOjE1OTc5Mzk3NTd9.QRel1Y4T5MAcqnSe999gjpQEczbBha4pfJ9U9DxHqSo'
                },
                method:'PATCH'
            })
            .then(res=>res.json())
            .then((data)=>{
                this.props.getUpdatedPeople()
            })
            .catch((e)=>console.log('e'))
        }

    }

    render()
    {
        return(
            <div style={{height:'120px',position:'relative'}} onMouseOver={this.ChangeBackground} onMouseLeave={this.ChangeBackgroundBack}>
                <img src={ProfilePicture} style={ProfilePictureStyle} />
                <h2 style={{display:'inline',position:'relative',left:'107px',color:'#BEBEBE'}}>{this.props.account_name}</h2>
                <h2 style={{display:'inline',position:'absolute',left:'530px',top:'23px',color:'#BEBEBE'}}>@chiragsrinivas</h2>
                <Button style={this.props.ButtonStyle} onClick={this.FollowOrUnFollowHandler}>{this.props.ButtonValue}</Button>
                <hr style={{position:'relative',top:'40px'}}/>
            </div>
        )
    }
}

export default IndividualPerson;