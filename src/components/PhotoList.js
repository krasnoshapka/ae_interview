import React, { useState, useEffect, useContext } from 'react';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import authMiddleWare from '../utils/auth';
import axios from 'axios';
import {apiURL} from '../constants/config';

const styles = (theme) => ({
  root: {
    display: 'flex',
    paddingTop: 70,
    paddingBottom: 50
  },
});

const PhotoList = (props) => {


  useEffect(() => {
    authMiddleWare().then(() => {
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios
        .get(`${apiURL}/images`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('AuthToken');
            props.history.push('/');
          }
          console.log(error);
        });
    });

  }, []);

  const { classes } = props;
  return (
    <div className={classes.root}>
      Photo list
      <Link href="/photo" variant="body2">
        See photo
      </Link>
    </div>
  );
};

export default withStyles(styles)(PhotoList);
