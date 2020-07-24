import React from 'react';

import Bernard from '../../images/bernard.jpg';
import Laverne from '../../images/laverne.jpg';
import Hoagie from '../../images/hoagie.jpg';
import Verde from '../../images/green.jpg';

let timer;
let slideIndex = 1;

function showSlide(n) {
  let slides = document.querySelectorAll('.js-slide');

  if (n >= slides.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = slides.length - 1; // Array con 4 items --> última posición: 3
  }

  // esconder todos
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  // mostrar elegido
  slides[slideIndex].style.display = 'flex';
}

function plusSlide(n) {
  clearInterval(timer);
  showSlide((slideIndex += n));
}

class Carousel extends React.Component {
  render() {
    return (
      <div className='carousel__container'>
        {/* <!-- Bernard --> */}
        <article className='carousel__main js-bernard js-slide fade'>
          <div className='carousel__image--container'>
            <img
              className='carousel__image'
              src={Bernard}
              alt='foto de Bernard'
              title='Bernard'
            />
          </div>
          <div className='carousel__text'>
            <p className='quote'>
              "Puedo arreglar casi cualquier dispositivo electrónico pero cuando
              conozco a alguien y tengo que presentarme prefiero usar siempre
              Maniac Coders Profile Cards"
            </p>
            <span className='firm'>- Bernard -</span>
          </div>
        </article>

        {/* <!-- Laverne --> */}

        <article className='carousel__main js-laverne js-slide fade'>
          <div className='carousel__image--container'>
            <img
              className='carousel__image'
              src={Laverne}
              alt='foto de Laverne'
              title='Laverne'
            />
          </div>
          <div className='carousel__text'>
            <p className='quote'>
              "Las Tarjetas de Maniac Coders son tan profesionales que el
              hospital que me contrató creyó que era cirujana de verdad"
            </p>
            <span className='firm'>- Laverne -</span>
          </div>
        </article>

        {/* <!--  Hoagie --> */}

        <article className='carousel__main js-hoagie js-slide fade'>
          <div className='carousel__image--container'>
            <img
              className='carousel__image'
              src={Hoagie}
              alt='foto de Hoagie'
              title='Hoagie'
            />
          </div>
          <div className='carousel__text'>
            <p className='quote'>
              "Esto para qué es? Disfruta lo que comes, porque como siempre
              digo: -No viviremos para ver el ayer."
            </p>
            <span className='firm'>- Hoagie -</span>
          </div>
        </article>

        {/* <!-- Verde --> */}

        <article className='carousel__main js-green js-slide fade'>
          <div className='carousel__image--container'>
            <img
              className='carousel__image'
              src={Verde}
              alt='foto de Verde'
              title='Verde'
            />
          </div>
          <div className='carousel__text'>
            <p className='quote'>
              "Maniac Coders profile cards hizo famoso a mi grupo de música. Es
              una de mis cosas favoritas además de la leche con cereales"
            </p>
            <span className='firm'>- Verde -</span>
          </div>
        </article>

        {/* <!-- Arrows --> */}

        <i
          className='fas fa-caret-left prev js-arrow-carousel'
          onClick={() => plusSlide(-1)}
        ></i>
        <i
          className='fas fa-caret-right next js-arrow-carousel'
          onClick={() => plusSlide(1)}
        ></i>
      </div>
    );
  }
}

export default Carousel;
