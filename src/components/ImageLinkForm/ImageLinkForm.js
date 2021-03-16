import React from 'react'
import './ImageLinkForm.css'
/* eslint-disable */
const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => (
  <div className="imageLinkForm">
    <p className="f3">
      This module will allow auto detections of faces in pictures. <br/>
      Just past the link from the image you want to study : 
    </p>
    <div className="flex justify-center">
      <div className="pa4 br3 shadow-5 w-70 motif">
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={onInputChange}
        />
        <button
          className="ttu white w-30 grow f4 link ph3 pv2 dib bg-light-purple"
          type="button"
          onClick={onPictureSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  </div>
)

export default ImageLinkForm
