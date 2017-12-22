import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';

import BookItem from './BookItem';


class SearchBooks extends React.Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  };

  state =  {
    query: '',
    apiBooks: []
  };

  updateQuery = (query) => {

    this.setState({
      query: query.trim()
    });

    BooksAPI.search(query.trim()).then((apiBooksSearchResults) => {
     this.setState({apiBooks: apiBooksSearchResults});
    });

  };

  clearQuery = () => {
    this.setState({query: ''});
  };

  render() {

    const {query} = this.state;
    const {onChangeShelf} = this.props;

    let searchBooksResult = [];

    if (query && Object.prototype.toString.call(this.state.apiBooks) === '[object Array]') {
      searchBooksResult = this.state.apiBooks;
      searchBooksResult.sort(sortBy('title'));
    } else {
      searchBooksResult = [];
    }

    return (

      <div>
        <div className="search-books">

          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                placeholder="Search by title or author"
                type="text">

                </input>
            </div>
            <button
              className="remove-query"
              onClick={() => this.clearQuery()}>
              Show All
            </button>
          </div>

        </div>



        <div className="search-books-result">

          <ol className="books-grid">

            {searchBooksResult.map((book) => (

              <BookItem
                className="book-item"
                key={book.id}
                bookitem={book}
                onChangeShelf={onChangeShelf}
              />

            ))}

          </ol>

        </div>

      </div>
    );
  }
}

export default SearchBooks;
