import React, { Component } from 'react';
import logo from './icons/logo.svg';
import './App.css';

import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';





class App extends Component {

  state = {
    books: [],
    booksShelf: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    }
  };


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state)
    })
  }

  changeShelf = (book, shelf) => {

    let remainingBooks = this.state.books.filter((b) => {
      return b.id !== book.id;
    });

    book.shelf = shelf;

    let updatedBooks = remainingBooks.concat(book);

    this.setState((state) => ({
      books: updatedBooks
    }));

    BooksAPI.update(book, shelf);
  };


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
            booksShelf={this.state.booksShelf}
            onChangeShelf={this.changeShelf}
          />
        </div>
      </div>
    );
  }
};


export default App;
