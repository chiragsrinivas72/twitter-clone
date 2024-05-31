import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';


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
    //backgroundImage: 'linear-gradient(to right, #f46b45, #eea849)'
    background: '#108dc7',  
    background:'-webkit-linear-gradient(#ef8e38, #108dc7)',
    background:'linear-gradient(#ef8e38, #108dc7)'

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
                    <img src={this.props.account_img_src} 
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="http://localhost:5000/image/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";
                        }} 
                    style={ProfilePictureStyle} />
                    <Link to={"/profile/"+this.props.account_id} style={{ textDecoration: 'none'}}>
                        <h2 style={{position:'relative',left:'170px',bottom:'80px',color:'#FDF5E6',fontWeight:'bold'}}>{this.props.account_name}</h2>
                    </Link>
                    <h4 style={{position:'relative',left:'170px',bottom:'95px',color: '#FDF5E6',fontFamily:'Times New Roman,serif'}}>{'@'+this.props.username}</h4>
                    <Button style={this.props.ButtonStyle} onClick={this.FollowOrUnFollowHandler}>{this.props.ButtonValue}</Button>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default IndividualPerson;