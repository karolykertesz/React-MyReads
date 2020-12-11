import React, { Component } from "react";

export default class OneBook extends Component {
  changer = (event) => {
    let shelf = event.target.value;
    this.props.bookChanger(this.props.book, shelf);
  };

  render() {

    const { book, bookChanger } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${book.imageLinks.thumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.changer}>
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
        <div className="book-authors">{book.authors || "Unknown"}</div>
      </div>
    );
  }
}