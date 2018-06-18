import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAlbums } from './reducers';
import { loadAlbums } from './actions';
import PropTypes from 'prop-types';
import './Albums.css';

export class Albums extends PureComponent {

  static propTypes = {
    albums: PropTypes.array,
    loadAlbums: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadAlbums();
  }

  render() {
    const { albums } = this.props;
    if(!albums) return null;

    return (
      <div><h1>ALBUMS</h1>
        <ul className = 'album-grid'>
          {albums.map((album, i) => <li key={i}>
            <Link to={`/albums/${album._id}`}>
              <div id = 'title'>{album.title}</div>
              <img src = {album.posterImage} id = 'poster-image'/>
            </Link>
          </li>)}
        </ul>
      </div> //mockup basic display of albums. list of albums.
    );
  }
}

export default connect(
  state => ({ albums: getAlbums(state) }),
  { loadAlbums }
)(Albums);