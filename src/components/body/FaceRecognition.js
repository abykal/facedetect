import React from 'react';



const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 mb2 overflow-hidden'>
                <img id='inputimage' alt='face' src={imageUrl} width='50%' height='auto'/>
            </div>  
        </div>
    )
}

export default FaceRecognition;