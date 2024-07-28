import { useState } from "react";
import PropTypes from 'prop-types';

const Book = ({ book, shelf, onMove }) => {
  const [value, setValue] = useState(shelf || 'none');

  const handleChange = (value) => {
    setValue(value);
    onMove(book, value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : "icons/book-placeholder.svg"
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={value}
              onChange={(event) => handleChange(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : "Unknown Author"}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
    shelf: PropTypes.string,
  }).isRequired,
  shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read', 'none']),
  onMove: PropTypes.func.isRequired,
};

export default Book;
