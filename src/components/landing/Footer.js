import React from 'react';
import footerLogo from '../../images/logo-adalab.png';

class Footer extends React.Component{
    render(){
        return(
            <footer className="footer">
                <div className="wrapper">
                    <span className="footer__text">Maniac Coders &copy; 2020</span>
                    <div className="footer__container">
                    <a href="../../../public/index.html" title="Ir a la página de inicio">
                        <img
                        className="footer__container--logo"
                        src={footerLogo}
                        alt="Logo Maniac Coders"
                        />
                    </a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer; 