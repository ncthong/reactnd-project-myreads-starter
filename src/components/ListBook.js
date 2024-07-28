import BooksByShelf from "./BooksByShelf";
import { Link } from "react-router-dom";

const ListBook = ({ shelfs, books, onMove }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelfs.map((shelf) => (
          <BooksByShelf
            key={shelf.value}
            shelf={shelf}
            books={books.filter(book => book.shelf === shelf.value)}
            onMove={onMove}
          />
        ))}
      </div>
      <div className="open-search">
        <Link to="search">
          <label>Add a book</label>
        </Link>
      </div>
    </div>
  );
};

export default ListBook;
