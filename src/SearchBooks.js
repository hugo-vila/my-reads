import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';


class SearchBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state =  {
    query: ''
  };

  updateQuery =  (query) => {
    this.setState({query: query.trim()});
  };

  clearQuery = () => {
    this.setState({query: ''});
  };

  render() {

    const {query} = this.state;
    const {onChangeShelf, books} = this.props;

    let searchBooksResult = [];

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      searchBooksResult = books.filter((book) => {
        return match.test(book.title);
      });
    }

    searchBooksResult.sort(sortBy('title'));

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
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">

                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>


                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => onChangeShelf(book, event.target.value)}>
                          <option value="none" disabled>Move to...</option>

                            <option value="currentlyReading">Currently Reading</option>

                            <option value="wantToRead">Want to Read</option>

                            <option value="read">Read</option>

                        </select>
                      </div>

                    </div>


                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author) => (
                      <div className="book-authors" key={author}>{author}</div>
                    ))}
                  </div>

              </li>
            ))}

          </ol>

        </div>

      </div>
    );
  }
}

export default SearchBooks;
