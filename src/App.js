import "./App.css";
import { useState, useEffect, useCallback,useMemo } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import ListBook from "./components/ListBook";
import SearchBook from "./components/SearchBook";

function App() {
  const [error, setError] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);

  const shelfs = useMemo(() => [
    { value: "currentlyReading", label: "Currently Reading" },
    { value: "wantToRead", label: "Want to Read" },
    { value: "read", label: "Read" },
  ], []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await BooksAPI.getAll();
        setMyBooks(books);
      } catch {
        setError(true);
      }
    };

    fetchBooks();
  }, []);

  const updateBook = useCallback(async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      setMyBooks((prevBooks) => {
        if (shelf === "none") {
          return prevBooks.filter((b) => b.id !== book.id);
        } else {
          book.shelf = shelf;
          return prevBooks.filter((b) => b.id !== book.id).concat(book);
        }
      });
    } catch {
      setError(true);
    }
  }, []);

  const searchBooksList = useCallback(async (query) => {
    if (query.trim()) {
      try {
        const results = await BooksAPI.search(query);
        setSearchBooks(results.error ? [] : results);
      } catch {
        setSearchBooks([]);
      }
    } else {
      setSearchBooks([]);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setSearchBooks([]);
  }, []);

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={<ListBook shelfs={shelfs} books={myBooks} onMove={updateBook} />}
        />
        <Route
          exact
          path="/search"
          element={
            <SearchBook
              searchBooks={searchBooks}
              books={myBooks}
              onSearch={searchBooksList}
              onMove={updateBook}
              onResetSearch={resetSearch}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
