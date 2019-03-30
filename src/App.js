import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/header/Navigation";
import Logo from "./components/header/Logo";
import ImageLinkForm from "./components/body/ImageLinkForm";
import Rank from "./components/body/Rank";
import "./App.css";

// CLARFAI API
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '00e106a6f360437e8403cf978954360c'
 });


// PARTICLE.JS BUBBLE SETUP 
const particleOptions = {
  particles: {
    number: {
      value: 260,
      density: {
        enable: true
      }
    },
    "color": {
      "value": "random"
    },
    size: {
      value: 4,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      random: true,
      speed: 1,
      direction: "top",
      out_mode: "out"
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "repulse"
      }
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0
      },
      repulse: {
        distance: 400,
        duration: 4
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    
    // CLARIFAI API for FACE DETECTION 
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );

  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
        />
        {/*<FaceRecognition />*/}
      </div>
    );
  }
}

export default App;
