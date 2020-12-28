import React from 'react'

// eslint-disable-next-line react/prop-types
function FaceRecognition({ imgLink }) {
  return (
    <div className="flex justify-center pa5 br2">
      <img src={imgLink} alt="face" width="500px" height="auto" />
    </div>
  )
}

export default FaceRecognition
