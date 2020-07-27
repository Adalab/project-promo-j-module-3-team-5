import React from 'react';
import '../stylesheets/App.scss';
import LandingMain from './landing/LandingMain';
import Footer from './landing/Footer';

function Landing() {
  return (
    <div className='App'>
      <LandingMain />
      <Footer />
    </div>
  );
}

export default Landing;
