import React from 'react';
import '../stylesheets/App.css';
import LandingMain from './landing/LandingMain';
import Footer from './landing/Footer';
import Carousel from './landing/Carousel';

function App() {
  return (
    <div className="App">
      <LandingMain />
      <Carousel />
      <Footer />
    </div>
  );
}

export default App;
