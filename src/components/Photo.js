// TODO:
// Displays a fullscreen photo in a closable popup.
// Shows author name, camera model and hashtags as an overlay.
// Allows sharing a photo URL via a floating action button.
// Support zooming and panning for images.
// Supports navigating between images (left/right)
// (optional) Animated screen transitions would be a plus

import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import authMiddleWare from "../utils/auth";
import axios from "axios";
import {apiURL} from "../constants/config";
import { PictureSet } from '../redux/actions';

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

const Photo = ({classes, pictures, PictureSet, ...props}) => {
  let { id } = useParams();
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const pic = pictures.find(item => item.id == id);
    if (pic && pic['full_picture']) {
      // Get full data from redux
      setPicture(pic);
    } else {
      // Fetch picture data from server
      authMiddleWare().then((authToken) => {
        axios.defaults.headers.common = {Authorization: `${authToken}`};
        axios
          .get(`${apiURL}/images/${id}`)
          .then((response) => {
            PictureSet(response.data);
            setPicture(response.data);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.removeItem('AuthToken');
              window.location.href = '/';
            }
            console.log(error);
          });
      });
    }
  }, []);

  if (!id || !picture) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <Container maxWidth="sm" className={classes.root}>
        <Link to="/">Back to list</Link>

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
  state => ({
    pictures: state.pictures,
  }),
  { PictureSet },
)(withStyles(styles)(Photo));
