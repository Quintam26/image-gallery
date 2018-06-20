import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAlbums } from './reducers';
import { addAlbum } from './actions';
import './NewAlbum.css';

const defaultState = {
  title: '',
  description: '',
  posterImage: ''
};

export class NewAlbum extends PureComponent {

  static propTypes = {
    addAlbum: PropTypes.func.isRequired,
    history: PropTypes.object
  };

  state= {
    edit: defaultState
  };

  handleChange = ({ target }) => {
    this.setState(({ edit }) => {
      return {
        edit: {
          ...edit,
          [target.name]: target.value
        }
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addAlbum(this.state.edit);
    this.setState({
      edit: { ...defaultState }
    });
    this.props.history.push('/albums');

  };

  render() {
    const { title, description, posterImage } = this.state.edit;

    return (
      <div className = "new-album"><h1>Add New Album</h1>&nbsp;
        <form onSubmit={this.handleSubmit}>
          <label>
          Title:
            <input name="title" value={title} onChange={this.handleChange} required/>
          </label>
          <label>
           Description:
            <input name="description" value={description} onChange={this.handleChange} required/>
          </label>
          <label>
          Poster Image URL:
            <input name="posterImage" value={posterImage} onChange={this.handleChange} required/>
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => ({ albums: getAlbums(state) }),
  { addAlbum }
)(NewAlbum);