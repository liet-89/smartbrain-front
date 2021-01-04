import React from 'react'
import './Rank.css'

const Rank = ({name, rank}) => (
  <div>
    <div className="white f3">{name}, your current rank is ...</div>
    <div className="f1 white">#{rank}</div>
  </div>
)

export default Rank
