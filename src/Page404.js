import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icons/logo.svg';

const Page404 = (props) => (
  <div className="App">
    <header className="list-books-title" key="list-books-title">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>MyReads</h1>
    </header>
    <h1>404</h1>
    <h2>Page Not Found!</h2>
    <Link to="/">Back to Main Page</Link>
  </div>
);

export default Page404;
