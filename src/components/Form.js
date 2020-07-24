import React from 'react';
import '../stylesheets/App.scss';
import Header from './form/Header';
import Card from './form/Card';
import Footer from './landing/Footer';
import Collapsable from './form/Collapsable';
import Evilbot from './form/Evilbot';

function Form() {
  return (
    <div className='Form'>
      <Header />
      <Collapsable />
      <Card />
      <Evilbot />
      <Footer />
    </div>
  );
}

export default Form;
