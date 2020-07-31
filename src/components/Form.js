import React from 'react';
import '../stylesheets/App.scss';
import Header from './form/Header';
import Card from './form/Card';
import Footer from './landing/Footer';
import Collapsable from './form/Collapsable';
import Evilbot from './form/Evilbot';

function Form(props) {
  return (
    <div className='Form card-generator'>
      <Header />
      <main class='main__card-generator'>
        <div class='card-generator__wrapper'>
          <Card avatar={props.avatar} />
          <Collapsable
            avatar={props.avatar}
            isAvatarDefault={props.isAvatarDefault}
            updateAvatar={props.updateAvatar}
          />
        </div>
        <Evilbot />
      </main>
      <Footer />
    </div>
  );
}

export default Form;
