import { getAllAlbums, postAlbum, getImages, postImage } from '../../services/api';
import { ALBUMS_LOAD, ALBUM_ADD, LOAD_IMAGES, IMAGE_ADD } from './reducers';

export const loadAlbums = () => dispatch => {
  dispatch({
    type: ALBUMS_LOAD,
    payload: getAllAlbums()
  });
};

export const addAlbum = (album) => dispatch => {
  dispatch({
    type: ALBUM_ADD,
    payload: postAlbum(album)
  });
};

export const loadImages = (albumId) => dispatch => {
  dispatch({
    type: LOAD_IMAGES,
    payload: getImages(albumId)
  });
};

export const addImage = (image, albumId) => dispatch => {
  dispatch({
    type: IMAGE_ADD,
    payload: postImage(image, albumId)
  });
};