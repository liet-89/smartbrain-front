import React from 'react'
import './Register.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email :'',
      password:'',
      name:'',
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
    }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
    }
  
  onNameChange = (event) => {
    this.setState({name: event.target.value})
    }


  onSubmitRegister = () => {
    const { email, password, name} = this.state
    console.log(this.state)
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    }).then(res => res.json())
    .then(user =>  {
      if(user.id) {
        this.props.loadUser(user.id)
        this.props.onRouteChange('home')
      }
    })
  }

  
  render () {return (
  <main className="pa4 black-80">
    <div className="measure center">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
        <legend className="f4 fw6 ph0 mh0">Register</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
          <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
        </div>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
          <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
        </div>
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
        </div>
          <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" /> Remember me
          </label>
      </fieldset>
      <div className="">
          <input onClick={this.onSubmitRegister}  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
      </div>
    </div>
  </main>
  
)}
}

export default Register