import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Book from "./Book";

const SearchBook = ({ searchBooks, books, onSearch, onResetSearch, onMove }) => {
  const [query, setQuery] = useState("");
  const [updatedSearchBooks, setUpdatedSearchBooks] = useState([]);

  const updateQuery = useCallback((query) => {
    setQuery(query);
    onSearch(query);
  }, [onSearch]);

  useEffect(() => {
    const newSearchBooks = searchBooks.map((book) => {
      const existingBook = books.find((b) => b.id === book.id);
      return {
        ...book,
        shelf: existingBook ? existingBook.shelf : "none",
      };
    });

    setUpdatedSearchBooks(newSearchBooks);
  }, [searchBooks, books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <label className="close-search" onClick={onResetSearch}>
            Close
          </label>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {updatedSearchBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelf={book.shelf}
              onMove={onMove}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBook;
