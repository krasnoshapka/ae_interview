import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import authMiddleWare from '../utils/auth';
import axios from 'axios';
import {apiURL, resultsNum} from '../constants/config';
import {PicturesSet, PictureSelect, PictureSet} from '../redux/actions';

const styles = (theme) => ({
  root: {
    display: 'flex',
    paddingTop: 70,
    paddingBottom: 50
  },
  gridList: {
  },
});

const PhotoList = ({classes, pictures, PicturesSet, PictureSelect, PictureSet, ...props}) => {
  const [hasMore, setHasMore] = useState(true);
  // TODO: save page in redux in order to stay on the same page
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (pictures.length < (page * resultsNum)) {
      // Fetch next page
      authMiddleWare().then(() => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = {Authorization: `${authToken}`};
        axios
          .get(`${apiURL}/images`, {
            params: {
              page: page
            }
          })
          .then((response) => {
            PicturesSet(response.data.pictures);
            setHasMore(response.data.hasMore);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.removeItem('AuthToken');
              props.history.push('/');
            }
            console.log(error);
          });
      });
    }
  }, [page]);

  const handleSelect = (event, id) => {
    event.preventDefault();
    const picture = pictures.find(item => item.id == id);
    if (picture && picture['full_picture']) {
      // Get full data from redux
      PictureSelect(picture);
    } else {
      // Fetch picture data from server
      authMiddleWare().then(() => {
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = {Authorization: `${authToken}`};
        axios
          .get(`${apiURL}/images/${id}`)
          .then((response) => {
            PictureSet(response.data);
            PictureSelect(response.data);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.removeItem('AuthToken');
              props.history.push('/');
            }
            console.log(error);
          });
      });
    }
  }

  const handleNext = (event) => {
    event.preventDefault();
    setPage(page+1);
  }

  const handlePrevious = (event) => {
    event.preventDefault();
    setPage(page-1);
  }

  if (!pictures) {
    return (
      <div>Loading...</div>
    );
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Container maxWidth="lg">
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {pictures.slice((page -1) * resultsNum, page * resultsNum).map((picture) => (
              <GridListTile key={picture.id}>
                <Link href="" onClick={(event) => handleSelect(event, picture.id)}>
                  <img src={picture.cropped_picture} />
                </Link>
              </GridListTile>
            ))}
          </GridList>
          <br />
          <div className="pagination">
            {
              page > 1 && (
                <React.Fragment>
                  <Link src="" onClick={handlePrevious} >Previous</Link>...
                </React.Fragment>
              )
            }
            {hasMore && (
              <Link src="" onClick={handleNext} >Next</Link>
            )}
          </div>
        </Container>
      </div>
    );
  }
};

export default connect(
  state => ({
    pictures: state.pictures,
  }),
  { PicturesSet, PictureSelect, PictureSet },
)(withStyles(styles)(PhotoList));
