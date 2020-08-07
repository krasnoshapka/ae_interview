// TODO: find better naming for picture actions
export const PicturesSet = (pictures) => ({
  type: 'PICTURES_SET',
  payload: pictures,
});
export const PictureSet = (picture) => ({
  type: 'PICTURE_SET',
  payload: picture,
});

export const PictureSelect = (picture) => ({
  type: 'PICTURE_SELECT',
  payload: picture,
});
