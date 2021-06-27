import React from 'react';
import SideBar from '../components/SideBar.js';
import IndividualPerson from './IndividualPerson.js';
import Grid from '@material-ui/core/Grid';

var FollowButtonStyle={
    backgroundColor:'#63C5DA',
    position:'relative',
    bottom:'80px',
    left:'140px'
}

var UnFollowButtonStyle={
    backgroundColor:'red',
    position:'relative',
    bottom:'80px',
    left:'140px'
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
            'Authorization':'Bearer ' + localStorage['token']
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
                        'Authorization':'Bearer ' + localStorage['token']
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
                <SideBar history={this.props.history}/>
                <div style={{position:'absolute',left:'300px',width:'1200px',marginBottom:'200px'}}>
                    <Grid container spacing={10} style={{position:'relative',top:'100px',display:'flex'}}>
                        {this.state.People.map((person_obj)=>
                        <IndividualPerson  key={this.state.People.indexOf(person_obj)} 
                            ButtonStyle={this.state.Following.includes(person_obj.account_id) ? UnFollowButtonStyle : FollowButtonStyle}
                            ButtonValue={this.state.Following.includes(person_obj.account_id) ? "UNFOLLOW" : "FOLLOW"}
                            account_name={person_obj.account_name}
                            username={person_obj.username}
                            getUpdatedPeople={this.getPeople} 
                            account_id={person_obj.account_id}
                            account_img_src={person_obj.account_img_src}
                            />)}
                    </Grid>
                </div>
            </div>    
            
        );
    }

}

export default People;