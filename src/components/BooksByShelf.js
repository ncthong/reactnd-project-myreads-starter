import Book from "./Book";
import PropTypes from 'prop-types';

const BooksByShelf = ({ shelf, books, onMove }) => {
  const booksByShelf = books.filter(book => book.shelf === shelf.value);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksByShelf.map(book => (
            <Book key={book.id} book={book} shelf={shelf.value} onMove={onMove} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BooksByShelf.propTypes = {
  shelf: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
      }),
      shelf: PropTypes.string,
    })
  ).isRequired,
  onMove: PropTypes.func.isRequired,
};

export default BooksByShelf;
