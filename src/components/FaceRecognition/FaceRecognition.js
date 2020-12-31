/* eslint-disable react/prop-types */
import React from 'react'
import './FaceRecognition.css'

// eslint-disable-next-line react/prop-types
function FaceRecognition({ imageUrl, box }) {
  return (
    <div className="flex justify-center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        />
      </div>
    </div>
  )
}

export default FaceRecognition
