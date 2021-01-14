import React from 'react';
import './App.css';
import {BrowserRouter,Switch,Route} from  'react-router-dom'; 
import Header from  './components/Header';
import NavBar from  './components/NavBar';
import Tracklist from  './components/AllTracks';
import Playlist from  './components/Playlist';
function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
          <NavBar />
          <Switch>                    
              <Route exact path="/" component={Playlist} />
              <Route path="/tracks" component={Tracklist} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
