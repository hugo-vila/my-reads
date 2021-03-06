import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

import BookItem from './BookItem';


const ListBooks = (props) => (

  <div className="list-books">

    {Object.entries(props.booksShelf).map((shelf) => (

      <div className="bookshelf" key={shelf[0]}>
        <h2 className="bookshelf-title">{shelf[1]}</h2>
        <div className="bookshelf-books">

          <ol className="books-grid">

            {props.books.sort(sortBy('title')).filter(book => book.shelf.toString() === shelf[0].toString()).map((book) => (

              <BookItem
                className="book-item"
                key={book.id}
                bookitem={book}
                onChangeShelf={props.onChangeShelf}
              />
            ))}

          </ol>

        </div>
      </div>

    ))}

  </div>

);

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  booksShelf: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default ListBooks;
