import React, { useState, useEffect, useContext } from 'react';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import authMiddleWare from "../utils/auth";
import {apiURL} from "../constants/config";

const styles = (theme) => ({
  root: {
    display: 'flex',
    paddingTop: 70,
    paddingBottom: 50
  },
});

const Photo = (props) => {

  const { classes } = props;
  return (
    <div className={classes.root}>
      Photo

      <Link href="" variant="body2">
        Back to list
      </Link>
    </div>
  );
};

export default withStyles(styles)(Photo);
