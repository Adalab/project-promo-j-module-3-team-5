import React from 'react';
import GetAvatar from './GetAvatar';
// TODO fix evilbot reaction to name and jobReacion https://github.com/Adalab/project-promo-j-module-2-team-1-morning/blob/30af70063724c771709c5f3e6fc92488c28352f9/src/js/05-evilbot.js#L104
import getDataFromApi from '../../services/api';
let checkedPalette;
let dataObject = {};
let linkTwitter;
const emailReaction = [
  `Pero, ¡revisa luego los correos que te lleguen!`,
  `¿Email? ¿Todavía no domináis la telepatía?`,
];
const createCard = [
  `Ya tienes lo que querías, ¿me puedes dejar en paz?`,
  `Estupendo, ahora tus datos están en mi poder ¡muahaha!`,
];

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
function storeObject() {
  createDataObject();
  //   localStorage.setItem('userData', JSON.stringify(dataObject));
}

function closeCollapsable() {
  const card = document.querySelector('.card__viewer'); //TODO verificar si si esta agregado
  document.addEventListener('click', checkFormValidity);
  const colArrow = document.querySelectorAll('.js-collapsibleParent > .arrow');
  const colBox = document.querySelectorAll('.collapsibleChild');

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

  card.classList.add('palette1');
  card.classList.remove('palette2', 'palette3', 'palette4');

  checkFormValidity();
  storeObject();
  localStorage.removeItem('userData');
}

function paintCard(event) {
  const defaultPerson = {
    name: 'Nombre Apellido',
    job: 'Front-end Developer',
  };
  const person = {
    name: document.querySelector('.js-personName'),
    job: document.querySelector('.js-personJob'),
    email: document.querySelector('.js-email'),
    phone: document.querySelector('.js-mobile'),
    linkedin: document.querySelector('.js-linkedin'),
    github: document.querySelector('.js-github'),
    photo: document.querySelector('.card--img'),
  };
  const inputName = document.querySelector('#name');
  const inputJob = document.querySelector('#job');
  const inputEmail = document.querySelector('#email');
  const inputPhone = document.querySelector('#phone');
  const inputLinkedin = document.querySelector('#linkedin');
  const inputGithub = document.querySelector('#github');
  // Paint Name and job
  if (event.target === inputName) {
    person.name.innerHTML =
      inputName.value !== '' ? inputName.value : defaultPerson.name;
  } else if (event.target === inputJob) {
    person.job.innerHTML =
      inputJob.value !== '' ? inputJob.value : defaultPerson.job;
  }

  // Paint Email
  else if (event.target === inputEmail) {
    if (inputEmail.value === '' || event.target.checkValidity() === false) {
      person.email.classList.add('hidden');
    } else if (event.target.checkValidity() === true) {
      person.email.href = `mailto:${inputEmail.value}`;
      person.email.classList.remove('hidden');
    }

    // Paint Phone
  } else if (event.target === inputPhone) {
    if (inputPhone.value === '' || event.target.checkValidity() === false) {
      person.phone.classList.add('hidden');
    } else if (event.target.checkValidity() === true) {
      person.phone.href = `tel:${inputPhone.value}`;
      person.phone.title = inputPhone.value;
      person.phone.classList.remove('hidden');
    }

    //Paint linkedin
  } else if (event.target === inputLinkedin) {
    if (inputLinkedin.value === '' || event.target.checkValidity() === false) {
      person.linkedin.classList.add('hidden');
    } else if (event.target.checkValidity() === true) {
      person.linkedin.href = `https://www.linkedin.com/in/${inputLinkedin.value}`;
      person.linkedin.classList.remove('hidden');
    }
  } else if (event.target === inputGithub) {
    if (inputGithub.value === '' || event.target.checkValidity() === false) {
      person.github.classList.add('hidden');
    } else if (event.target.checkValidity() === true) {
      person.github.href = `https://github.com/${inputGithub.value}`;
      person.github.classList.remove('hidden');
    }
  }

  checkFormValidity();
}



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

const userData = {
  name: '',
  job: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  photo: '',
};
class Collapsable extends React.Component {
  //Actualización del estado a vacio. TODO
  constructor(props) {
    super(props);
    this.state = userData;
    this.handleChange = this.handleChange.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.cardMount = this.cardMount.bind(this);
  }

  handleImg(image) {
    this.setState({ photo: image });
  }

  cardMount() {
    const defaultPerson = {
      name: 'Nombre Apellido',
      job: 'Front-end Developer',
    };
    const person = {
      name: document.querySelector('.js-personName'),
      job: document.querySelector('.js-personJob'),
      email: document.querySelector('.js-email'),
      phone: document.querySelector('.js-mobile'),
      linkedin: document.querySelector('.js-linkedin'),
      github: document.querySelector('.js-github'),
      photo: document.querySelector('.card--img'),
    };
    
    // Paint Name and job
  
    person.name.innerHTML =
      this.state.name !== '' ? this.state.name : defaultPerson.name;
  
    person.job.innerHTML =
    this.state.job !== '' ? this.state.job : defaultPerson.job;
    
  
    // Paint Email
  
      if (this.state.email === '') {
        person.email.classList.add('hidden');
      } else {
        person.email.href = `mailto:${this.state.email}`;
        person.email.classList.remove('hidden');
      }
  
      // Paint Phone
  
      if (this.state.phone === '') {
        person.phone.classList.add('hidden');
      } else {
        person.phone.href = `tel:${this.state.phone}`;
        person.phone.title = this.state.phone;
        person.phone.classList.remove('hidden');
      }
  
      //Paint linkedin
   
      if (this.state.linkedin === '') {
        person.linkedin.classList.add('hidden');
      } else {
        person.linkedin.href = `https://www.linkedin.com/in/${this.state.linkedin}`;
        person.linkedin.classList.remove('hidden');
      }
      if (this.state.github === '') {
        person.github.classList.add('hidden');
      } else {
        person.github.href = `https://github.com/${this.state.github}`;
        person.github.classList.remove('hidden');
      }
    
  
    checkFormValidity();
  }

  componentDidMount() {
    const dataLS = JSON.parse(localStorage.getItem('userData'));

    if (dataLS !== null) {
      this.setState({
        // palette: dataLS.palette,
        name: dataLS.name,
        job: dataLS.job,
        phone: dataLS.phone,
        photo: dataLS.photo,
        email: dataLS.email,
        linkedin: dataLS.linkedin,
        github: dataLS.github,
      });
    }
    this.cardMount();
  }

  componentDidUpdate() {
    localStorage.setItem('userData', JSON.stringify(this.state));
  }

  handleChange(event) {
    const key = event.target.name;
    const value = key === 'photo' ? this.props.avatar : event.target.value;
    console.log(`Valor a subir: ${value}
	============`);
    /*  const inputName = event.target.userData.name;
  const inputJob = event.target.userData.job;
  const inputEmail = event.target.userData.email;
  const inputPhone = event.target.userData.phone;
  const inputLinkedin = event.target.userData.linkedin;
  const inputGithub = event.target.userData.github;
  const inputPhoto = event.target.userData.photo;*/
    this.setState({
      [key]: value,
    });
  }

  handleForm(event) {
    paintCard(event);
    storeObject();
  }
  // createCardObject() {
  //   showCardDone();
  //   createDataObject();
  //   sendRequest(dataObject);
  // }
  showCollapsible(event) {
    // Definición de variables (ARRAYS)
    const card = document.querySelector('.card__viewer');
    const colDiv = document.querySelectorAll('.js-collapsibleParent');
    const colTitle = document.querySelectorAll('.js-collapsibleParent > h3');
    const colArrow = document.querySelectorAll(
      '.js-collapsibleParent > .arrow'
    );
    const colBox = document.querySelectorAll('.collapsibleChild');

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
      card.classList.add('palette1');
      card.classList.remove('palette2', 'palette3', 'palette4');
    } else if (event.target === palettes[1]) {
      card.classList.remove('palette3', 'palette1', 'palette4');
      card.classList.add('palette2');
    } else if (event.target === palettes[2]) {
      card.classList.add('palette3');
      card.classList.remove('palette2', 'palette1', 'palette4');
    } else if (event.target === palettes[3]) {
      card.classList.add('palette4');
      card.classList.remove('palette3', 'palette2', 'palette1');
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

  updateMessages() {
    const inputName = document.querySelector('#name');
    const inputJob = document.querySelector('#job');
    /*~~~~~~~~~  Greetings  ~~~~~~~~*/

    /*~~~~~~~~~  Name  ~~~~~~~~*/
    const name = [
      `<b>${inputName.value}</b>, ¿sabes que he venido a conquistar tu mundo?`,
      `Encantado, <b>${inputName.value}</b>, me alegra conocer tu nombre antes de acabar contigo`,
    ];
    // Reacción a name

    inputName.addEventListener('blur', function () {
      evilTalk(name, 4000);
    });

    /*~~~~~~~~~  Job  ~~~~~~~~*/
    const jobReaction = [
      `Vaya, como <b>${inputJob.value}</b> debes tener buen sueldo ¡Qué pena que vaya a destruir el mundo`,
      `¿Trabajar? Por eso los humanos sois una especie inferior`,
    ];
    // Reacción a job
    inputJob.addEventListener('blur', function () {
      evilTalk(jobReaction, 4000);
    });
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
        onKeyUp={(event) => {
          this.handleForm(event);
          this.updateMessages();
        }}
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
              <div className='palettes__container collapsibleChild hide-design'>
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

              <div className='fill-box collapsibleChild hide-fill'>
                <label htmlFor='name'>Nombre completo</label>
                <input
                  type='text'
                  placeholder='Ej: Tentáculo Morado'
                  id='name'
                  //   onBlur={this.evilTalk(nameReaction, 4000)} TODO Fix
                  name='name'
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                />
                <label htmlFor='job'>Puesto</label>
                <input
                  type='text'
                  placeholder='Ej: Front-end unicorn '
                  id='job'
                  //   onBlur={this.evilTalk(jobReaction, 4000)} TODO Fix
                  name='job'
                  onChange={this.handleChange}
                  value={this.state.job}
                  required
                />
                <label htmlFor='img-selector'>Imagen de perfil</label>
                {/* <!-- De aquí --> */}
                <GetAvatar
                  avatar={this.props.avatar}
                  isAvatarDefault={this.props.isAvatarDefault}
                  updateAvatar={this.props.updateAvatar}
                  handleChange={this.handleChange}
                  handleImg={this.handleImg}
                />
                {/* <div className='action__image-preview'>
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
                  <div className='profile'> */}
                {/* <!--btn-container --> */}
                {/* <div
                      className='profile__image js__profile-image'
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/300x300/cccccc/666666/?text=IMAGE)`,
                      }}
                    ></div>
                    <div className='profile__preview js__profile-preview'></div>
                  </div>
                </div> */}

                {/* {/* <!-- Aquí --> */}

                <label htmlFor='email'>Email</label>
                <input
                  className='email'
                  type='email'
                  placeholder='Ej: tentaculo@morado.com'
                  id='email'
                  onBlur={() => {
                    evilTalk(emailReaction, 4000);
                  }}
                  onChange={this.handleChange}
                  value={this.state.email}
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
                  onChange={this.handleChange}
                  value={this.state.userData}
                />

                <label htmlFor='linkedin'>Linkedin</label>
                <input
                  type='text'
                  placeholder='Ej: tentaculus'
                  id='linkedin'
                  name='linkedin'
                  pattern='[A-Za-z0-9]+'
                  onChange={this.handleChange}
                  value={this.state.linkedin}
                  required
                />

                <label htmlFor='github'>Github</label>
                <input
                  type='text'
                  placeholder='Ej: codingtentacle'
                  id='github'
                  name='github'
                  pattern='[A-Za-z0-9-]+'
                  onChange={this.handleChange}
                  value={this.state.github}
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
              <div className='share__container--button collapsibleChild hide-share'>
                <button
                  type='button'
                  className='button__card btn--disable'
                  href=''
                  title='Crear tarjeta'
                  onClick={(event) => {
                    console.log('patata');
                    // this.createCardObject(event);
                    getDataFromApi(localStorage.getItem('userData'))
                      .then(data => {
                        console.log('api');
                        showCardDone();
                        showURL(data);
                      })
                    evilTalk(createCard, 5000);
                  }} //TODO comprobar funcionamiento
                  
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
