import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  topBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

const Header = (props) => {
  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.topBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Photos storage
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withStyles(styles)(Header);
