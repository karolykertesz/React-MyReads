import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShels from "./Components/Bookshels";
import "./App.css";
import SearchPage from "./Components/SearchPage";
import searchItems from "./searchTerms";

class App extends React.Component {
  state = {
    books: [],
    booksB: [],
    error: "",
  };
  componentDidMount = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  };
  resetBooks = () => {
    this.setState({ booksB: [] });
  };
  bookChanger = (book, shelf) => {
    book.shelf = shelf;
    this.setState((prev) => ({
      books: prev.books.filter((bb) => bb.id !== book.id).concat([book]),
    }));
    BooksAPI.update(book, shelf);
  };
  bookSearch = (query) => {
    const checker = (queryString) => {
      if (searchItems.includes(!queryString)) {
        return;
      }
      return queryString;
    };

    BooksAPI.search(checker(query)).then((book) => {
      if (Array.isArray(book)) {
        this.displayBooks(book);
      }
    });
  };
  displayBooks = (queryBooks) => {
    let prevBooks = this.state.books;
    let booksB = queryBooks.map((book) => {
      prevBooks.forEach((bb) => {
        if (book.id === bb.id) {
          book = bb;
        }
      });
      return book;
    });
    this.setState({ booksB: booksB });
    console.log(this.state.booksB);
  };
  render() {
    {
      this.state.error && console.log(this.state.error);
    }
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Route
          exact
          path="/"
          render={() => (
            <BookShels book={this.state.books} bookChanger={this.bookChanger} />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <SearchPage
              bookChanger={this.bookChanger}
              displayBooks={this.displayBooks}
              bookSearch={this.bookSearch}
              booksB={this.state.booksB}
              resetBooks={this.resetBooks}
            />
          )}
        />
      </div>
    );
  }
}
export default App;