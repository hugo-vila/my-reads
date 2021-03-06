import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from './icons/logo.svg';
import './App.css';

import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import Page404 from './Page404';



class App extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {

    let remainingBooks = this.state.books.filter((b) => {
      return b.id !== book.id;
    });

    book.shelf = shelf;

    let updatedBooks = remainingBooks.concat(book);

    BooksAPI.update(book, shelf)
      .then(
        this.setState((state) => ({
          books: updatedBooks
        }))
      );
  };


  render() {

    const booksShelf = {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    };

    const {books} = this.state;
    const {changeShelf} = this;

    return (
      <div className="app">
        <div className="list-books">

          <Switch>
            <Route exact path="/" render={() => [
              <header className="list-books-title" key="list-books-title">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>MyReads</h1>
              </header>,
              <ListBooks
                key="list-books"
                className="list-books-content"
                books={books}
                booksShelf={booksShelf}
                onChangeShelf={changeShelf}
              />,
              <div className="open-search" key="open-search"><Link to="/search">Search books</Link></div>
            ]}/>

            <Route path="/search" render={() => (
              <SearchBooks
                onChangeShelf={changeShelf}
                myReads={books}
              />
            )}/>

            <Route loc={this.props.location} component={Page404}/>
          </Switch>

        </div>
      </div>
    );
  }
};


export default App;
