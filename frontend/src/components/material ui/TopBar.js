import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

export default function TopBar(props) {
  return (
    <React.Fragment>
        <AppBar style={{backgroundColor:'#000000',positon:'absolute',width:'1360px',left:'240px'}}>
          <Toolbar>
            <Typography variant="h6" style={{position:'relative',left:'545px'}}>Home</Typography>
          </Toolbar>
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}