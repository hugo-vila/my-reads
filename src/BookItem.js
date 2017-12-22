import React, { Component } from 'react';
import PropTypes from 'prop-types';

import missingCoverBook from './icons/missing-cover-book.svg';

class BookItem extends Component {

  static propTypes = {
    bookitem: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {

    const {bookitem, onChangeShelf} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">

            <div className="book-cover" style={{
              backgroundImage: `url(${(bookitem.imageLinks && bookitem.imageLinks.smallThumbnail) || missingCoverBook})`}}></div>

              <div className="book-shelf-changer">
                <select value={bookitem.shelf || 'none'} onChange={(event) => onChangeShelf(bookitem, event.target.value)}>
                  <option value="none" disabled>Move to...</option>

                    <option value="currentlyReading">Currently Reading</option>

                    <option value="wantToRead">Want to Read</option>

                    <option value="read">Read</option>

                </select>
              </div>

            </div>


            <div className="book-title">{bookitem.title}</div>
            {(bookitem.authors && bookitem.authors.length >= 1) && (
              bookitem.authors.map((author) => (
                <div className="book-authors" key={author}>{author}</div>
              ))
            )}
          </div>

      </li>
    )
  }
}

export default BookItem;
