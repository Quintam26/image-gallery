import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAlbums } from './reducers';
import { loadAlbums } from './actions';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Albums.css';

class Albums extends PureComponent {

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

      <div><h1>Featured Albums</h1>

        <ul className = 'album-grid'>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {albums.map((album, i) => <li key={i}>
              <Link to={`/albums/${album._id}`}>
                <div id = 'title'>{album.title}</div>
                <img src = {album.posterImage} id = 'poster-image'/>
              </Link>
            </li>)}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({ albums: getAlbums(state) }),
  { loadAlbums }
)(Albums);