import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';

import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';




class App extends Component {

  state = {
    books: []
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state)
    })
  }

  changeShelf = (book, index, shelf) => {
    let updatedBooks = this.state.books.slice();
    updatedBooks[index].shelf = shelf;

    this.setState((state) => ({
      books: updatedBooks
    }));

    BooksAPI.update(book, shelf);
  }


  render() {

    return (
      <div className="app">
        <div className="list-books">
          <header className="list-books-title">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>MyReads</h1>
          </header>
          <ListBooks
            className="list-books-content"
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        </div>
      </div>
    );
  }
}


export default App;
