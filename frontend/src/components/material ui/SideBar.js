import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left" 
      >
        <div className={classes.toolbar} />
        <h1 style={{position:'absolute',left:'65px'}}>Twitter</h1>
        <Divider style={{position:'relative',top:'1px'}}/>
        <List style={{position:'relative',top:'10px'}}>

            <ListItem button key={'Home'}>
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>

            <ListItem button key={'People'}>
            <ListItemIcon>{<PeopleIcon />}</ListItemIcon>
            <ListItemText primary={'People'} />
            </ListItem>

        </List>

        <Divider style={{position:'relative',top:'14px'}}/>

        <List style={{position:'relative',top:'18px'}}>
            <ListItem button key={'Profile'}>
              <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItem>
        </List>

      </Drawer>
      
    </div>
  );
}
