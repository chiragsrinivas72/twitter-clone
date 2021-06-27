import React from 'react';
import ProfilePicture from '../images/1.png';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

var ProfilePictureStyle={
    height:'85px',
    position:'relative',
    width:'80px',
    left:'10px',
    top:'20px',
    borderRadius:'3rem'
};

var PersonCardStyle={
    height:'200px',
    width:'400px',
    borderRadius:'0.9rem',
    marginLeft:'80px',
    backgroundImage: 'linear-gradient(to right, #f46b45, #eea849)'
}

class IndividualPerson extends React.Component{
    
    constructor(props)
    {
        super(props)
        this.FollowOrUnFollowHandler=this.FollowOrUnFollowHandler.bind(this)
    }

    FollowOrUnFollowHandler(event)
    {
        if(event.target.innerHTML=='FOLLOW')
        {
            const id = String(this.props.account_id)
            fetch('http://localhost:5000/accounts/addFollowing/'+id,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + localStorage['token']
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
                    'Authorization':'Bearer ' + localStorage['token']
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
            <Grid item xs={12} sm={6} md={4}>
                <Card style={PersonCardStyle}>
                    <CardContent>
                    <img src={this.props.account_img_src} style={ProfilePictureStyle} />
                    <h2 style={{position:'relative',left:'170px',bottom:'80px'}}>{this.props.account_name}</h2>
                    <h2 style={{position:'relative',left:'165px',bottom:'90px'}}>{'@'+this.props.username}</h2>
                    <Button style={this.props.ButtonStyle} onClick={this.FollowOrUnFollowHandler}>{this.props.ButtonValue}</Button>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default IndividualPerson;