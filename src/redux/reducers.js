import {combineReducers} from "redux";

const PicturesReducer = (state = null, action) => {
  switch (action.type) {
    case 'PICTURES_SET':
      return action.payload;
    default:
      return state;
  }
};

const PictureSelectReducer = (state = null, action) => {
  switch (action.type) {
    case 'PICTURE_SELECT':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  pictures: PicturesReducer,
  selected: PictureSelectReducer
});
