import React from 'react';
import LogoHeader from '../../images/logo-completom.png';

class Header extends React.Component {
  render() {
    return (
      <header className='header wrapper'>
        <div className='header__main'>
          <a href='../../../public/index.html' title='Ir a la página de inicio'>
            <img
              className='header__main--logo'
              src={LogoHeader}
              alt='Logo Maniac Coders Awesome profile cards'
            />
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
