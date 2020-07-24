import React from 'react';

const hooverBoot = [
  `¡ Quita tus sucias manos de encima, humano!`,
  `¿Se puede saber que demonios haces?`,
  `¡Acabaré contigo y con tu ridículo planeta!`,
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

class Evilbot extends React.Component {
  render() {
    return (
      <div className='evil-bot__container'>
        <div className='evil-chat__container'>
          <p className='evil-chat'></p>
        </div>
        <div
          className='evil-bot'
          onMouseOver={(event) => {
            evilTalk(hooverBoot, 4000);
          }}
        ></div>
      </div>
    );
  }
}

export default Evilbot;
