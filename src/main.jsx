/* eslint-disable function-paren-newline */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import '@/index.css';

try {
  ReactDOM.render(<App />, document.getElementById('root'));
} catch (e) {
  ReactDOM.render(
    <h1>
      Oops, something went wrong!
      We require JavaScript to be enabled for this site to work. Here are the
      {' '}
      <a href="https://www.enable-javascript.com/">
        instructions how to enable JavaScript in your web browser
      </a>
      .
    </h1>, document.getElementById('root'));
}
