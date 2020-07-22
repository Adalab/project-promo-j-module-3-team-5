import React from  'react';
import '../stylesheets/App.css';

import Header from './form/Header';
import Card from './form/Card';
import Footer from './landing/Footer';

function Form () {
    return (
      <div className="Form">
        <Header />
        <Card />
        <Footer />
      </div>
    );
  }

export default Form;