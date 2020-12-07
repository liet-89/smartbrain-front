import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = () => (
  <div>
    <p className="f3">
      This module will allow auto detections of faces in pictures
    </p>
    <div className="flex justify-center">
      <div className="pa4 br3 shadow-5 w-70 motif">
        <input className="f4 pa2 w-70 center" type="text" />
        <button
          className="ttu white w-30 grow f4 link ph3 pv2 dib bg-light-purple"
          type="button"
        >
          Detect
        </button>
      </div>
    </div>
  </div>
)

export default ImageLinkForm
