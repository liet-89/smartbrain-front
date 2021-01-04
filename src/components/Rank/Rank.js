import React from 'react'
import './Rank.css'

const Rank = ({name, entries}) => (
  <div>
    <div className="white f3">{name}, your current entry count is ...</div>
    <div className="f1 white">#{entries}</div>
  </div>
)

export default Rank
