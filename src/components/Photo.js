// TODO:
// Displays a fullscreen photo in a closable popup.
// Shows author name, camera model and hashtags as an overlay.
// Allows sharing a photo URL via a floating action button.
// Support zooming and panning for images.
// Supports navigating between images (left/right)
// (optional) Animated screen transitions would be a plus

import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {PictureSelect} from "../redux/actions";
import Container from "@material-ui/core/Container";

const styles = (theme) => ({
  root: {
    paddingTop: 70,
    paddingBottom: 50
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 300,
  },
});

const Photo = ({classes, picture, PictureSelect, ...props}) => {

  const handleBack = (event) => {
    event.preventDefault();
    PictureSelect(null);
  }

  if (!picture) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <Container maxWidth="sm" className={classes.root}>
        <Link href="" variant="body2" onClick={(event) => handleBack(event)}>
          Back to list
        </Link>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={picture.full_picture}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {picture.author} ({picture.camera})
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {picture.tags}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/*<Button size="small" color="primary">*/}
            {/*  Share*/}
            {/*</Button>*/}
            {/*<Button size="small" color="primary">*/}
            {/*  Learn More*/}
            {/*</Button>*/}
          </CardActions>
        </Card>
      </Container>
    );
  }
};

export default connect(
  undefined,
  { PictureSelect },
)(withStyles(styles)(Photo));
