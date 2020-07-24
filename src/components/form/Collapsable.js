import React from 'react';

let checkedPalette;
let dataObject = {};
let linkTwitter;

// Array con los links sociales (del input)

function twitterShare(urlCard) {
  const twitterURL = document.querySelector('.button__twitter');
  twitterURL.href = `http://twitter.com/share?text=Aquí tienes mi Maniac coder's Awesome Profile Cards🖥️&hashtags=adalaber,promoJemison&user_mentions=Adalab_Digital&url=${urlCard}`;
}

function showURL(result) {
  const linkCard = document.querySelector('.link__card');
  if (result.success) {
    linkTwitter = result.cardURL;
    twitterShare(linkTwitter);
    linkCard.innerHTML =
      '<a href=' +
      result.cardURL +
      ' target="_blank">' +
      result.cardURL +
      '</a>';
  } else {
    linkCard.innerHTML = 'Muahaha ¡otro error humano!' + result.error;
  }
}

function getPicLocal() {
  const userDataRaw = localStorage.getItem('userData');
  const userData = JSON.parse(userDataRaw);
  if (userData !== null) {
    return userData.photo;
  } else {
    return '';
  }
}

function sendRequest(json) {
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (result) {
      showURL(result);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createDataObject() {
  const inputName = document.querySelector('#name');
  const inputJob = document.querySelector('#job');
  const inputEmail = document.querySelector('#email');
  const inputPhone = document.querySelector('#phone');
  const inputLinkedin = document.querySelector('#linkedin');
  const inputGithub = document.querySelector('#github');

  dataObject = {
    palette: checkedPalette,
    name: inputName.value,
    job: inputJob.value,
    email: inputEmail.value,
    phone: inputPhone.value,
    linkedin: inputLinkedin.value,
    github: inputGithub.value,
    photo: getPicLocal(), // photo: fr.result || getPicLocal(),
  };
}

function showCardDone() {
  const cardDone = document.querySelector('.js-carddone');
  const buttonCard = document.querySelector('.button__card');
  if (!buttonCard.hasAttribute('disable')) {
    cardDone.classList.remove('hidden');
    buttonCard.classList.add('btn--disable');
    buttonCard.setAttribute('disabled', '');
  }
}

function createCardObject() {
  showCardDone();
  createDataObject();
  sendRequest(dataObject);
}

function storeObject() {
  createDataObject();
  localStorage.setItem('userData', JSON.stringify(dataObject));
}

function closeCollapsable() {
  const card = document.querySelector('.card__viewer');
  document.addEventListener('click', checkFormValidity);
  const colArrow = document.querySelectorAll('.js-collapsibleParent > .arrow');
  const colBox = document.querySelectorAll('.js-collapsibleChild');

  const allInputs = document.querySelectorAll('input');
  let trueFalseInputs = [];
  for (let i = 0; i < allInputs.length; i++) {
    const result = allInputs[i] === document.activeElement;
    console.log(result);
    trueFalseInputs.push(result);
  }
  const hasFalse = trueFalseInputs.findIndex((element) => element === true);
  console.log(hasFalse);
  if (hasFalse === -1) {
    colBox[0].classList.add('hide-design');
    colBox[1].classList.add('hide-fill');
    colBox[2].classList.remove('hide-share');

    colArrow[0].classList.remove('arrow-active');
    colArrow[1].classList.remove('arrow-active');
    colArrow[2].classList.toggle('arrow-active');
    card.classList.remove('large');
    document.removeEventListener('click', checkFormValidity);
  }
}

function checkProfileImg() {
  // comprobar si hay imagen en localStorage
  const userDataRaw = localStorage.getItem('userData');
  const userData = JSON.parse(userDataRaw);
  const btnUpload = document.querySelector('.js__profile-upload-btn');
  if (userData !== null) {
    if (userData.photo === '') {
      btnUpload.setAttribute('required', 'required');

      return false;
    } else {
      btnUpload.removeAttribute('required');

      return true;
    }
  } else {
    btnUpload.setAttribute('required', 'required');

    return false;
  }
}

function checkFormValidity() {
  const form = document.querySelector('.form');
  const inputName = document.querySelector('#name');
  const inputJob = document.querySelector('#job');
  const inputEmail = document.querySelector('#email');
  //   const inputPhone = document.querySelector('#phone');
  //   const inputLinkedin = document.querySelector('#linkedin');
  //   const inputGithub = document.querySelector('#github');
  const buttonCard = document.querySelector('.button__card');
  if (
    inputName.value !== '' &&
    inputJob.value !== '' &&
    inputEmail.value !== '' &&
    checkProfileImg() === true &&
    form.checkValidity() === true
  ) {
    /// función cierra colapsable
    console.log('Chequeando form');
    closeCollapsable();
    buttonCard.classList.remove('btn--disable');
    buttonCard.classList.add('btn--enable');
    buttonCard.removeAttribute('disabled');
  } else {
    buttonCard.classList.remove('btn--enable');
    buttonCard.classList.add('btn--disable');
    buttonCard.setAttribute('disabled', '');
  }
}

function checkPalette() {
  const palettes = document.querySelectorAll('.palette');
  for (const palette of palettes) {
    if (palette.checked) {
      checkedPalette = palette.value;
    }
  }
}

function resetForm() {
  const card = document.querySelector('.card__viewer');
  const person = {
    name: document.querySelector('.js-personName'),
    job: document.querySelector('.js-personJob'),
    email: document.querySelector('.js-email'),
    phone: document.querySelector('.js-mobile'),
    linkedin: document.querySelector('.js-linkedin'),
    github: document.querySelector('.js-github'),
    photo: document.querySelector('.card--img'),
  };
  const defaultPerson = {
    name: 'Nombre Apellido',
    job: 'Front-end Developer',
  };
  document.querySelector('.form').reset();
  person.name.innerHTML = defaultPerson.name;
  person.job.innerHTML = defaultPerson.job;
  person.photo.style.backgroundImage =
    "url('./assets/images/imagen-prueba.jpg')";
  //   profilePreview.style.backgroundImage = 'none'; TODO componente

  if (person.phone.classList.contains('.hidden') === false) {
    person.phone.classList.add('hidden');
  }
  person.phone.href = '';

  if (person.email.classList.contains('.hidden') === false) {
    person.email.classList.add('hidden');
  }
  person.email.href = '';

  if (person.linkedin.classList.contains('.hidden') === false) {
    person.linkedin.classList.add('hidden');
  }
  person.github.href = '';

  if (person.github.classList.contains('.hidden') === false) {
    person.github.classList.add('hidden');
  }
  person.github.href = '';

  card.classList.add('js-palette1');
  card.classList.remove('js-palette2', 'js-palette3', 'js-palette4');

  checkFormValidity();
  storeObject();
  localStorage.removeItem('userData');
}

class Collapsable extends React.Component {
  showCollapsible(event) {
    // Definición de variables (ARRAYS)
    const card = document.querySelector('.card__viewer');
    const colDiv = document.querySelectorAll('.js-collapsibleParent');
    const colTitle = document.querySelectorAll('.js-collapsibleParent > h3');
    const colArrow = document.querySelectorAll(
      '.js-collapsibleParent > .arrow'
    );
    const colBox = document.querySelectorAll('.js-collapsibleChild');

    // Caso 1: Pulsamos design

    if (
      event.target === colTitle[0] ||
      event.target === colArrow[0] ||
      event.target === colDiv[0]
    ) {
      colBox[0].classList.toggle('hide-design');
      colBox[1].classList.add('hide-fill');
      colBox[2].classList.add('hide-share');

      colArrow[0].classList.toggle('arrow-active');
      colArrow[1].classList.remove('arrow-active');
      colArrow[2].classList.remove('arrow-active');
      card.classList.remove('large');

      // Caso 2: Pulsamos fill
    } else if (
      event.target === colTitle[1] ||
      event.target === colArrow[1] ||
      event.target === colDiv[1]
    ) {
      colBox[0].classList.add('hide-design');
      colBox[1].classList.toggle('hide-fill');
      colBox[2].classList.add('hide-share');

      colArrow[0].classList.remove('arrow-active');
      colArrow[1].classList.toggle('arrow-active');
      colArrow[2].classList.remove('arrow-active');

      // animate card-prewview
      card.classList.toggle('large');

      // Caso 3: pulsamos share
    } else if (
      event.target === colTitle[2] ||
      event.target === colArrow[2] ||
      event.target === colDiv[2]
    ) {
      colBox[0].classList.add('hide-design');
      colBox[1].classList.add('hide-fill');
      colBox[2].classList.toggle('hide-share');

      colArrow[0].classList.remove('arrow-active');
      colArrow[1].classList.remove('arrow-active');
      colArrow[2].classList.toggle('arrow-active');
      card.classList.remove('large');
    }
  }
  changeColors(event) {
    const card = document.querySelector('.card__viewer');
    const palettes = document.querySelectorAll('.palette');
    const background = document.querySelector('.card-background');

    background.classList.add('run-animation');
    if (event.target === palettes[0]) {
      card.classList.add('js-palette1');
      card.classList.remove('js-palette2', 'js-palette3', 'js-palette4');
    } else if (event.target === palettes[1]) {
      card.classList.remove('js-palette3', 'js-palette1', 'js-palette4');
      card.classList.add('js-palette2');
    } else if (event.target === palettes[2]) {
      card.classList.add('js-palette3');
      card.classList.remove('js-palette2', 'js-palette1', 'js-palette4');
    } else if (event.target === palettes[3]) {
      card.classList.add('js-palette4');
      card.classList.remove('js-palette3', 'js-palette2', 'js-palette1');
    }

    setTimeout(function () {
      background.classList.remove('run-animation');
    }, 1000);
    for (const palette of palettes) {
      if (palette.checked) {
        checkedPalette = palette.value;
      }
    }
    checkPalette();
    checkFormValidity();
    storeObject();
  }

  if(buttonReset) {
    buttonReset.addEventListener('click', resetForm);
  }
  render() {
    return (
      <form
        className='form'
        action=''
        method='post'
        onClick={this.showCollapsible}
      >
        <div className='wrapper'>
          <div className='design'>
            {/* <!--       DESIGN      --> */}
            <div className='container__design'>
              {/* <!-- Collapsable parent: DESIGN title --> */}
              <div className='container__design--title js-collapsibleParent'>
                <i className='main__menu-icon far fa-object-ungroup'></i>
                <h3>Diseña</h3>
                <i className='arrow fas fa-chevron-down'></i>
              </div>
              {/* <!-- Collapsable child: PALETTES --> */}
              <div className='palettes__container js-collapsibleChild hide-design'>
                <span>Colores</span>
                <div className='palettes__options'>
                  <div className='option option1'>
                    <label htmlFor='palette1'>
                      <input
                        type='radio'
                        className='palette'
                        id='palette1'
                        value='1'
                        name='palette'
                        onChange={this.changeColors}
                        required
                        defaultChecked
                      />
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                    </label>
                  </div>
                  <div className='option option2'>
                    <label htmlFor='palette2'>
                      <input
                        type='radio'
                        className='palette'
                        onChange={this.changeColors}
                        id='palette2'
                        value='2'
                        name='palette'
                        required
                      />
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                    </label>
                  </div>
                  <div className='option option3'>
                    <label htmlFor='palette3'>
                      <input
                        type='radio'
                        className='palette'
                        onChange={this.changeColors}
                        id='palette3'
                        value='3'
                        name='palette'
                        required
                      />
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                    </label>
                  </div>
                  <div className='option option4'>
                    <label htmlFor='palette4'>
                      <input
                        type='radio'
                        className='palette'
                        onChange={this.changeColors}
                        id='palette4'
                        value='4'
                        name='palette'
                        required
                      />
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                      <div className='palette__color'></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--       FILL        --> */}
          <div className='fill'>
            <div className='container__fill'>
              <div className='container__fill--title js-collapsibleParent'>
                <i className='main__menu-icon far fa-keyboard'></i>
                <h3>Rellena</h3>
                <i className='arrow fas fa-chevron-down'></i>
              </div>

              <div className='fill-box js-collapsibleChild hide-fill'>
                <label htmlFor='name'>Nombre completo</label>
                <input
                  type='text'
                  placeholder='Ej: Tentáculo Morado'
                  id='name'
                  name='name'
                  required
                />
                <label htmlFor='job'>Puesto</label>
                <input
                  type='text'
                  placeholder='Ej: Front-end unicorn '
                  id='job'
                  name='job'
                  required
                />
                <label htmlFor='img-selector'>Imagen de perfil</label>
                {/* <!-- De aquí --> */}
                <div className='action__image-preview'>
                  <div className='action'>
                    <button
                      className='action__upload-btn js__profile-trigger btn-addimage'
                      type='button'
                    >
                      Añadir imagen
                    </button>
                    <input
                      type='file'
                      name=''
                      id='img-selector'
                      className='action__hiddenField js__profile-upload-btn'
                    />
                  </div>
                  <div className='profile'>
                    {/* <!--btn-container --> */}
                    <div
                      className='profile__image js__profile-image'
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/300x300/cccccc/666666/?text=IMAGE)`,
                      }}
                    ></div>
                    <div className='profile__preview js__profile-preview'></div>
                  </div>
                </div>

                {/* <!-- Aquí --> */}

                <label htmlFor='email'>Email</label>
                <input
                  className='email'
                  type='email'
                  placeholder='Ej: tentaculo@morado.com'
                  id='email'
                  name='email'
                  pattern='[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'
                  required
                />

                <label htmlFor='phone'>Teléfono</label>
                <input
                  className='phone'
                  type='tel'
                  placeholder='Ej: 690902412'
                  id='phone'
                  name='phone'
                  pattern='[0-9]{9}'
                />

                <label htmlFor='linkedin'>Linkedin</label>
                <input
                  type='text'
                  placeholder='Ej: tentaculus'
                  id='linkedin'
                  name='linkedin'
                  pattern='[A-Za-z0-9]+'
                  required
                />

                <label htmlFor='github'>Github</label>
                <input
                  type='text'
                  placeholder='Ej: codingtentacle'
                  id='github'
                  name='github'
                  pattern='[A-Za-z0-9-]+'
                  required
                />
              </div>
            </div>
          </div>

          {/* <!--       SHARE      --> */}

          <div className='share'>
            <div className='share__container'>
              <div className='share__container--title js-collapsibleParent'>
                <i className='fa fa-share-alt' aria-hidden='true'></i>
                <h3>Comparte</h3>
                <i className='arrow fas fa-chevron-down'></i>
              </div>
              <div className='share__container--button js-collapsibleChild hide-share'>
                <button
                  type='button'
                  className='button__card btn--disable'
                  href=''
                  title='Crear tarjeta'
                  disabled
                >
                  <i className='i__card far fa-address-card'></i>CREAR TARJETA
                </button>
              </div>
            </div>
          </div>
          <div className='carddone js-carddone hidden'>
            <h3>La tarjeta ha sido creada</h3>
            <a className='link__card' href='./' title='Enlace de la tarjeta'>
              http://www.loquesea.com
            </a>
            <a
              className='button__twitter'
              href='./'
              title='Compartir en Twitter'
              target='_blank'
            >
              <i className='twitter-icon fab fa-twitter'></i>Compartir en
              twitter
            </a>
          </div>
        </div>
      </form>
    );
  }
}
export default Collapsable;
