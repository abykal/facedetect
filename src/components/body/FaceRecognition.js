import React from 'react';



const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 mb2'>
                <img alt='face picture' src={imageUrl} width='500px' height='auto'/>
            </div>  
        </div>
    )
}

export default FaceRecognition;