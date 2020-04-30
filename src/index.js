import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DefaultApp from './App';
import * as serviceWorker from './serviceWorker';


// const reactAnchorElement = React.createElement('a', {
//     href: 'https://www.w3schools.com/REACT/default.asp',
//     target: '_blank'
// }, 'Learn React from Scoala IT');
//
// const defaultAppElement = React.createElement(DefaultApp, {});


ReactDOM.render(
  <React.StrictMode>
      <DefaultApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


