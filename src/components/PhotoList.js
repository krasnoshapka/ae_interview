import React, { useState, useEffect, useContext } from 'react';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

const styles = (theme) => ({
  root: {
    display: 'flex',
    paddingTop: 70,
    paddingBottom: 50
  },
});

const PhotoList = (props) => {
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
