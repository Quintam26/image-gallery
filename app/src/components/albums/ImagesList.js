import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImagesByAlbum } from './reducers';
import { loadImages } from './actions';

class ImagesList extends PureComponent {

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
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {images.map(image => 
              <tr key={image._id}>
                <td>{image.title}</td>
                <td>{image.description}</td>
                <td>{image.url}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

export default connect(
  state => ({ images: getImagesByAlbum(state) }),
  { loadImages }
)(ImagesList);