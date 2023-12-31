import React from 'react'

const ImageLoader = (props) => {
  return (
    <div className='imageLoader'>
    <div className='loader'>
       
        </div>
        <p className='percent'>{props.progress} %</p>
    </div>
  )
}

export default ImageLoader