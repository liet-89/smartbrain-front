import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import molecule from './logo.png'

const Logo = () => (
  <div className="ma4 mt0">
    <Tilt
      className="f5 Tilt br2 flex items-center justify-center "
      options={{ max: 100, scale: 1 }}
      style={{ height: 250, width: 250 }}
    >
      <div className="Tilt-inner">
        <img src={molecule} alt="molecules icon" />
      </div>
    </Tilt>
  </div>
)

export default Logo
