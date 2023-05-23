import React from 'react';

export const PhotoFrame = ({url, title}) => {
   return(
    <div className='photoframe'>
        <img src={url} alt='image' />
        <p className='caption'>{title}</p>
    </div>
   )
}
