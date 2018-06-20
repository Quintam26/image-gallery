import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Albums from '../albums/Albums';
import About from '../about/About';
import AlbumDetail from '../albums/AlbumDetail';
import NewAlbum from '../albums/NewAlbum';
import './App.css';

export default class App extends PureComponent {
  render() {

    return (
      <Router>
        <div className = "grid-class">
          <Link to= "/"><img src={require('../../assets/Logo2.png')} id="logo"/></Link><header className="header"></header>
          
          <nav className = "nav-bar">
            <ul>
              <li><Link to= "/">Albums</Link></li>
              <li><Link to="/albums/new">Add Albums</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <main className = "main-area">
            {<Switch>
              <Route exact path="/" component={Albums}/>
              <Route path="/about" component={About}/>
              <Route exact path="/albums" component={Albums}/>
              <Route path="/albums/new" render={({ history }) => {
                return <NewAlbum history={history}/>;}}/>
              <Route path="/albums/:id" render={({ match }) => {
                return <AlbumDetail albumId={match.params.id} match={match}/>;
              }}/>
              <Redirect to="/"/>
            </Switch>}
          </main>
          <footer className = "foot"><p id = "foot-type">&copy; 2018 Manro and Lonergan Gallery.</p></footer>
        </div>
      </Router>
    );
  }

}