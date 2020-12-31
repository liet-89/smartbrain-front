import './App.css'
import React from 'react'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Rank from './components/Rank/Rank'

const app = new Clarifai.App({
  apiKey: 'bf7ba06eb4164d44831840ed80e726fb',
})

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    shape: {
      type: 'images',
      image: [
        { src: 'path/to/first/image.svg', height: 20, width: 20 },
        { src: 'path/to/second/image.jpg', height: 20, width: 20 },
      ],
    },
  },
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '', // eslint-disable-line
      imgURL: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    const { input } = this.state
    this.setState({ imgURL: input })
    console.log('click')
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err))
  }

  render() {
    const { imgURL, box } = this.state
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={imgURL} box={box} />
      </div>
    )
  }
}

export default App
