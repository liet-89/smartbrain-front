import React from 'react'
import './SignIn.css'

class SignIn extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail :'',
      signInPassword:'',
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
    }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
    }


  onSubmitSignIn = () => {
    const { signInEmail, signInPassword} = this.state
    console.log(this.state)
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      })
    }).then(res => res.json())
    .then(user => {
      if(user.id) {
        this.props.onRouteChange('home') 
        this.props.loadUser(user)
      }else { alert("Wrong Login") }
    })
  }


  render () {

    return (<main className="pa4 black-80">
    <div className="measure center">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
          <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
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
          <input onClick={() => this.onSubmitSignIn() }  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
      </div>
      <div className="lh-copy mt3">
        <p className="f6 link dim black db pointer">htmlForgot your password?</p>
        </div>
    </div>
  </main>)
  }
}

export default SignIn