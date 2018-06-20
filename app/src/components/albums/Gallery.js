import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImagesByAlbum } from './reducers';
import { loadImages } from './actions';
import './Gallery.css';

class Gallery extends PureComponent {

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    loadImages: PropTypes.func.isRequired,
    images: PropTypes.array
  };

  state = {
    imageSpot: 0
  };

  componentDidMount() {
    this.props.loadImages(this.props.albumId);
  }

  handlePrev = () => {
    this.setState({ imageSpot: this.state.imageSpot - 1 });
  };

  handleNext = () => {
    this.setState({ imageSpot: this.state.imageSpot + 1 });
  };

  render() {
    const { images } = this.props;
    const { imageSpot } = this.state;

    if(images.length === 0) return <div><h2>No Images to Show</h2></div>;

    return (
      <div>
        {(!!imageSpot) && <button onClick={this.handlePrev}>&lt;</button>}
        {images.map((image, i) => {
          if(i === imageSpot) return <img key={image._id} src={image.url}/>;
          return <img key={image._id} src={image.url} hidden/>;
        })}
        {(images.length > 1) && (imageSpot !== images.length - 1) && <button onClick={this.handleNext}>&gt;</button>}
      </div>
    );
  }
}

export default connect(
  state => ({ images: getImagesByAlbum(state) }),
  { loadImages }
)(Gallery);