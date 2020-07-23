import React from 'react';
import ProfileImage from '../../images/imagen-prueba.jpg';

class Card extends React.Component {
  render() {
    return (
      <section className="card__viewer">
        <div className="card-background"></div>
        <div className="wrapper">
          <button name="reset" className="btn btn--reset">
            <i className="far fa-trash-alt"></i> Reset
          </button>

          {/* <!-- Card Viewer --> */}
          <div className="card__viewer--card">
            {/* <!-- Text: name and description --> */}
            <div className="card__text">
              <h3 className="card__text--name js-personName">
                Nombre Apellido
              </h3>
              <p className="card__text--description js-personJob">
                Front-end developer
              </p>
            </div>

            {/* <!-- Profile pic --> */}
            <div className="card__container--img">
              <div
                className="card--img js__profile-image"
                style={{ backgroundImage: `url(${ProfileImage})` }}
              ></div>
              {/* Revisar */}
            </div>

            {/* <!-- Social links --> */}
            <ul className="card__viewer--social">
              <li className="social--item">
                <a className="social-info js-email hidden" href=" ">
                  <i className="far fa-envelope"></i>
                </a>
              </li>
              <li className="social--item">
                <a className="social-info js-mobile hidden" href=" " title="">
                  <i className="fas fa-mobile-alt"></i>
                </a>
              </li>
              <li className="social--item">
                <a className="social-info js-linkedin hidden" href=" ">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li className="social--item">
                <a className="social-info js-github hidden" href=" ">
                  <i className="fab fa-github-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Card;
