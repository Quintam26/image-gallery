import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getAlbum } from '../../services/api';
import { Switch, Route, Link } from 'react-router-dom';
import NewImage from './NewImage';
import ImagesThumbnail from './ImagesThumbnail';
import ImagesList from './ImagesList';
import Gallery from './Gallery';
import { getUrl } from '../../services/images';

export default class AlbumDetail extends PureComponent {

  static propTypes = {
    albumId: PropTypes.string.isRequired,
    match: PropTypes.object,
  };

  state = {
    title: null,
    description: null,
    posterImage: null
  };

  componentDidMount() {
    getAlbum(this.props.albumId)
      .then(album => this.setState({ title: album.title, description: album.description, posterImage: album.posterImage }));
  }

  render() {
    const { title, description, posterImage } = this.state;
    const { match, albumId } = this.props;
    const { url } = match;
    
    if(!this.state.title) return (<h1>Bad Album ID</h1>);

    return (
      <section>
        <div>
          <h1>{title.toUpperCase()}</h1>
          <p>{description}</p>
          <img src={getUrl(posterImage)}/> <br/>
          <Link to={`${url}/new`}>NEW IMAGE</Link>&nbsp;-&nbsp;
          <Link to={`${url}/thumbnail`}>THUMBNAILS</Link>&nbsp;-&nbsp;
          <Link to={`${url}/list`}>LIST</Link>&nbsp;-&nbsp;
          <Link to={`${url}/gallery`}>GALLERY</Link>
        </div>
        <div>
          <Switch>
            <Route path={`${url}/new`} render={({ history }) => {
              return <NewImage albumId={albumId} history={history}/>;
            }}/>
            <Route path={`${url}/thumbnail`} render={() => {
              return <ImagesThumbnail albumId={albumId}/>;
            }}/>
            <Route path={`${url}/list`} render={() => {
              return <ImagesList albumId={albumId}/>;
            }}/>
            <Route path={`${url}/gallery`} render={() => {
              return <Gallery albumId={albumId}/>;
            }}/>
          </Switch>
        </div>
      </section>
    );
  }
}