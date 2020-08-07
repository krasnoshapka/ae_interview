import {combineReducers} from "redux";

const PicturesReducer = (state = [], action) => {
  switch (action.type) {
    case 'PICTURES_SET':
      let pictures = [...state];
      action.payload.forEach((el) => {
        if (!pictures.find(item => item.id == el.id)) {
          pictures.push(el);
        }
      });

      return pictures;
    case 'PICTURE_SET':
      return state.map((pic) => {
        if (pic.id == action.payload.id) {
          return action.payload;
        }
        return pic;
      });
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
