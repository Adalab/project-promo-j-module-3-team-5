import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './components/App';
import Form from './components/Form';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);
