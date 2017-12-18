import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


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

    let searchBooksResult = [];
    if (this.state.query) {
      const match = new RegExp(this.state.query, 'i');
      console.log(match);
      searchBooksResult = this.props.books.filter((book) => {
        return match.test(book.title);
      });
    }

    console.log(searchBooksResult);

    return (

      <div>
        <div className="search-books">

          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                value={this.state.query}
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
                        <select value={book.shelf} onChange={(event) => this.props.onChangeShelf(book, event.target.value)}>
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
