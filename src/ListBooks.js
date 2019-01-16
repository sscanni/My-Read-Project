import React from 'react';
import './App.css';

  class ListBooks extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false
      }

    selectChange = (event) => {
        event.preventDefault();
        let b = event.target.name
        this.props.selectChange(event.target.value, this.props.books[b])
    };

    render() {
      return (
        <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.cat} ({this.props.books.length} books)</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.books.map((book, index) => <li key={index}>
                  <div className="book">
                    <div className="book-top">
                     <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select name={index} onChange={this.selectChange} >
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading" selected={(this.props.cat === 'Currently Reading') ? 'selected' : ''}>Currently Reading</option>
                          <option value="wantToRead" selected={(this.props.cat === 'Want to Read') ? 'selected' : ''}>Want to Read</option>
                          <option value="read" selected={(this.props.cat === 'Read') ? 'selected' : ''}>Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                  </div>
              </li>)}
              </ol>
            </div>
            </div>
          </div>
        </div>
    );
  }
};

export default ListBooks;