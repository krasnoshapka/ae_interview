import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Link} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import authMiddleWare from '../utils/auth';
import axios from 'axios';
import {apiURL, resultsNum} from '../constants/config';
import {PicturesSet, PageSet} from '../redux/actions';

const styles = (theme) => ({
  root: {
    display: 'flex',
    paddingTop: 70,
    paddingBottom: 50
  },
  gridList: {
  },
});

const PhotoList = ({classes, page, pictures, PicturesSet, PageSet, ...props}) => {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (pictures.length < (page * resultsNum)) {
      // Fetch next page
      authMiddleWare().then((authToken) => {
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
              window.location.href = '/';
            }
            console.log(error);
          });
      });
    }
  }, [page]);

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
            {pictures.slice((page - 1) * resultsNum, page * resultsNum).map((picture) => (
              <GridListTile key={picture.id}>
                <Link to={`/photo/${picture.id}`}>
                  <img src={picture.cropped_picture} />
                </Link>
              </GridListTile>
            ))}
          </GridList>
          <br />
          <div className="pagination">
            {page > 1 && (
                <React.Fragment>
                  <Link to="/" onClick={() => PageSet(--page)}>Previous</Link>...
                </React.Fragment>
            )}
            {hasMore && (
              <Link to="/" onClick={() => PageSet(++page)}>Next</Link>
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
    page: state.page
  }),
  { PicturesSet, PageSet },
)(withStyles(styles)(PhotoList));
