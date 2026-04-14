import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className='mt4 ml4'>
      <Tilt
        className='Tilt  br2 shadow-2'
        style={{ height: '150px', width: '150px' }}
      >
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img src={brain} alt='logo' style={{ width: '80px'}}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;