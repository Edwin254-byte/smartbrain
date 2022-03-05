import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/Particles/Particles';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageurl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
      this.setState({imageurl: this.state.input})
        const raw = JSON.stringify({
         "user_app_id": {
         "user_id": "edu254",
         "app_id": "eduson"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input 
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 24dcbdf692534bf19636d658f620e5d4'
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
}
    render(){
      return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit = {this.onButtonSubmit}/>
        <Particles className='particles'/>
        <FaceRecognition imageurl = {this.state.imageurl}/>
     </div>
    );
  }
}

export default App;
