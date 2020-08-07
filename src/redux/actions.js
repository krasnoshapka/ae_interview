export const PicturesSet = (pictures) => ({
  type: 'PICTURES_SET',
  payload: pictures,
});

export const PictureSelect = (id) => ({
  type: 'PICTURE_SELECT',
  payload: id,
});
