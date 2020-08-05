import React from 'react';
// import ProfileImage from '../../images/imagen-prueba.jpg';
import Profile from './Profile';

let dataObject = {};
let checkedPalette;
const reset = [
  `¡No estás conforme con nada! ¿te apetece destruir el mundo conmigo?`,
  `Equivocarse es humano...y los humanos deben ser destruidos`,
];

function evilTalk(text, seconds) {
  const evilBot = document.querySelector('.evil-bot');
  let evilChat = document.querySelector('.evil-chat');
  let evilContainer = document.querySelector('.evil-chat__container');
  // Efectos burbuja de texto
  evilBot.classList.add('talk');
  evilContainer.classList.add('fadein');

  // Cambia texto
  evilChat.innerHTML = text[randomN(text.length)];

  // Desaparcer burbuja despupés x segundos
  setTimeout(function () {
    evilContainer.classList.add('fadeout');
    evilContainer.classList.remove('fadein');
    evilBot.classList.remove('talk');
  }, seconds);
}

function randomN(max) {
  return Math.floor(Math.random() * max);
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

function createDataObject() {
  // TODO
  // const inputName = document.querySelector('#name');
  // const inputJob = document.querySelector('#job');
  // const inputEmail = document.querySelector('#email');
  // const inputPhone = document.querySelector('#phone');
  // const inputLinkedin = document.querySelector('#linkedin');
  // const inputGithub = document.querySelector('#github');

  // dataObject = {
  //   palette: checkedPalette,
  //   name: inputName.value,
  //   job: inputJob.value,
  //   email: inputEmail.value,
  //   phone: inputPhone.value,
  //   linkedin: inputLinkedin.value,
  //   github: inputGithub.value,
  //   photo: getPicLocal(), // photo: fr.result || getPicLocal(),
  // };
  // console.log(dataObject)
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

console.log(dataObject.name)
class Card extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   avatar: props.avatar,
    // };
  }
  resetForm() {
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
    // profilePreview.style.backgroundImage = 'none'; TODO COMPONENTE

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

    card.classList.add('palette1');
    card.classList.remove('palette2', 'palette3', 'palette4');

    checkFormValidity();
    storeObject();
    localStorage.removeItem('userData');
  }

  render() {
    return (
      <section className='card__viewer'>
        <div className='card-background'></div>
        <div className='wrapper'>
          <button
            name='reset'
            className='btn btn--reset'
            onClick={(event) => {
              this.resetForm();
              evilTalk(reset, 4000);
            }}
          >
            <i className='far fa-trash-alt'></i> Reset
          </button>

          {/* <!-- Card Viewer --> */}
          <div className='card__viewer--card'>
            {/* <!-- Text: name and description --> */}
            <div className='card__text'>
              <h3 className='card__text--name js-personName'>
                Nombre Apellido
              </h3>
              <p className='card__text--description js-personJob'>
                Front-end developer
              </p>
            </div>

            {/* <!-- Profile pic --> */}
            <Profile avatar={this.props.avatar} />
            {/* <div className='card__container--img'>
              <div
                className='card--img js__profile-image'
                style={{ backgroundImage: `url(${ProfileImage})` }}
              ></div>

            </div> */}

            {/* <!-- Social links --> */}
            <ul className='card__viewer--social'>
              <li className='social--item'>
                <a className='social-info js-email hidden' href=' '>
                  <i className='far fa-envelope'></i>
                </a>
              </li>
              <li className='social--item'>
                <a className='social-info js-mobile hidden' href=' ' title=''>
                  <i className='fas fa-mobile-alt'></i>
                </a>
              </li>
              <li className='social--item'>
                <a className='social-info js-linkedin hidden' href=' '>
                  <i className='fab fa-linkedin-in'></i>
                </a>
              </li>
              <li className='social--item'>
                <a className='social-info js-github hidden' href=' '>
                  <i className='fab fa-github-alt'></i>
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
