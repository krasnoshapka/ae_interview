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

const PageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'PAGE_SET':
      return parseInt(action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  pictures: PicturesReducer,
  page: PageReducer,
});
