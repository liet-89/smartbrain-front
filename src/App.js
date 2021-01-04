import './App.css'
import React from 'react'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Logo from './components/Logo/Logo'
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'

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
  },
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '', // eslint-disable-line
      imgURL: '',
      box: {},
      route: 'signIn',
      isSignedIn : false,
      user: {
        id:'',
        name:'',
        email:'',
        entries:'',
        joined:''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user:{
      id:data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
    console.log(this.state.user)
  }

  componentDidMount () {
    fetch('http://localhost:3000/')
    .then(res =>  res.json())
    .then(console.log)
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

  onRouteChange = (route) => {
    if (route === 'signOut') { this.setState({ isSignedIn: false })}
    else if (route === 'home') { this.setState({ isSignedIn: true }) }
    this.setState({route: route})
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
    const { imgURL, box, route, isSignedIn } = this.state
    const { name, entries } = this.state.user
    console.log(entries)
    
    return (
      
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        
        { route === 'home'
          ? <div>
              <Logo />
              <Rank rank={entries} name={name}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition imageUrl={imgURL} box={box} />
            </div>
          : (route === 'signIn'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}   />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    )
  }
}

export default App
