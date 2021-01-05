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

const server = 'http://localhost:3000/'

const initialState = {
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
  }

  componentDidMount () {
    fetch(`${server}`)
    .then(res =>  res.json())
    .then('in componentDidMount',console.log)
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
    console.log('indisplayFaceBox',box)
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if (route === 'signOut') { this.setState({ isSignedIn: false })}
    else if (route === 'home') { this.setState({ isSignedIn: true }) }
    this.setState({route})
  }

  onPictureSubmit = () => {

    const { input, user:{id} } = this.state
    this.setState({ imgURL: input, box:{} })
      fetch(`${server}imageUrl`, {
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({input})})
      .then(response => response.json())
      .then((response) => {
      if(response) {
        fetch(`${server}image`, {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({id:id})})
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user,{entries : count})))
        .catch((err) => console.log(err))
        this.displayFaceBox(this.calculateFaceLocation(response))
      }})
    .catch((err) => console.log(err))
  }

  render() {
    const { imgURL, box, route, isSignedIn } = this.state
    const { name, entries } = this.state.user
    
    return (
      
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        
        { route === 'home'
          ? <div>
              <Logo />
              <Rank entries={this.state.user.entries} name={this.state.user.name}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
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
