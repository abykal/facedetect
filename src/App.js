import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/header/Navigation";
import Signin from "./components/header/Signin";
import Logo from "./components/header/Logo";
import ImageLinkForm from "./components/body/ImageLinkForm";
import Rank from "./components/body/Rank";
import FaceRecognition from "./components/body/FaceRecognition";
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
      imageUrl: '',
      box: {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data['outputs'][0]['data']['regions'][0]['region_info']['bounding_box'];
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width) ,
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

displayFaceBox = (box) => {
  this.setState({box: box})
}

  // The input field catcher
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // DETECT Button
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    // CLARIFAI API for FACE DETECTION 
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)   //Here we are using input instead of imageUrl (error occurs which is an advaned topic)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    

  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation />
        
        { this.state.route === 'signin'
          ? <Signin />
          : <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        }
      </div>
    );
  }
}

export default App;
