import React, { Component } from 'react';
import Navigation from './components/header/Navigation';
import Logo from './components/header/Logo';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/*<ImageLinkForm />
        <FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
