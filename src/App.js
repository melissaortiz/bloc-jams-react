import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import logo from './bloc_jams_logo.png';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        
        <img src={logo} alt="logo" className="logo" />
          <nav className="navigation-links">
           <Link to='/'>Home </Link>
           <Link to='/library'> Library</Link> 
          </nav>
        </header>
        <main>
         <Route exact path="/" component={Landing} />
         <Route path="/library" component={Library} />
         <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
