import React from 'react';
import './FaceRecogniton.css';

const FaceRecogniton = ({imageUrl,box}) =>{
    return(
        <div className='center ma'>
                <div className='absolute mt2'>
                    {imageUrl && <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>} 
                    <div className='bounding-box' style={{top:box.topCol+'px', right:box.rightCol+'px',bottom:box.bottomRow+'px',left:box.leftCol+'px'}}>
                    </div>
                </div>
        </div>
    );
}

export default FaceRecogniton;