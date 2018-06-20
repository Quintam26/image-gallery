import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImagesByAlbum } from './reducers';
import { loadImages } from './actions';
import { getUrl } from '../../services/images';
import './ImagesThumbnail.css';

class ImagesThumbnail extends PureComponent {

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    loadImages: PropTypes.func.isRequired,
    images: PropTypes.array
  };

  componentDidMount() {
    this.props.loadImages(this.props.albumId);
  }

  render() {
    const { images } = this.props;

    if(images.length === 0) return <div><h2>No Images to Show</h2></div>;

    return (
      <div>
        <ul className = "thumbnail-list">
          {images.map(image => <li key={image._id}>
            <img src={getUrl(image.url)}/>
            <div id ="title">{image.title}</div>
            <div id = "description">{image.description}</div>
          </li>
          )}
        </ul>
      </div>
    );
  }

}

export default connect(
  state => ({ images: getImagesByAlbum(state) }),
  { loadImages }
)(ImagesThumbnail);