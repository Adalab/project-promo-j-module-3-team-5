import React from 'react';
import LogoHeader from '../../images/logo-completom.png';

class Header extends React.Component{
    render(){
        return(
            <header clasName="header wrapper">
                <div clasName="header__main">
                    <a href="../../../public/index.html" title="Ir a la página de inicio">
                    <img
                        clasName="header__main--logo"
                        src={LogoHeader}
                        alt="Logo Maniac Coders Awesome profile cards"
                    />
                    </a>
                </div>
            </header>
        )
    }
}

export default Header;