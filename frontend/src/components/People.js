import React from 'react';
import SideBar from '../components/SideBar.js';
import IndividualPerson from './IndividualPerson.js';
import PeopleImage from '../images/people_image.png';

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

var PeopleImageStyle = {
    backgroundImage: `url(${PeopleImage})`,
    height: '500px',
    width:'1357px',
    backgroundSize: '100% auto',
    position: 'relative',
    right: '59px',
    bottom:'8px'
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
                    <div style={this.state.People.length!=0 ? {border:'solid white',position:'relative',top:'100px',cursor:'pointer'} : {display:'none'}}>
                        {this.state.People.map((person_obj)=> 
                        <IndividualPerson  key={this.state.People.indexOf(person_obj)} 
                            ButtonStyle={this.state.Following.includes(person_obj.account_id) ? UnFollowButtonStyle : FollowButtonStyle}
                            ButtonValue={this.state.Following.includes(person_obj.account_id) ? "UNFOLLOW" : "FOLLOW"}
                                account_name={person_obj.account_name}
                                username={person_obj.username}
                            getUpdatedPeople={this.getPeople} 
                            account_id={person_obj.account_id}/>)}
                    </div>
                </div>
            </div>    
            
        );
    }

}

export default People;