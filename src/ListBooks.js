import React from 'react';
import './App.css';

  class ListBooks extends React.Component {
    
    selectChange = (event) => {
      let bookIndex = event.target.name
      let targetCat = event.target.value
      this.props.moveBook(targetCat, this.props.books[bookIndex])
    };

    render() {
      return (
        <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">
               {this.props.shelf === 'currentlyReading' ? 'Currently Reading ' : 
               (this.props.shelf === 'wantToRead' ? 'Want to Read ' : 
               (this.props.shelf === 'read' ? 'Read ' : ''))} 
               ({this.props.books.length} books)
            </h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {this.props.books.map((book, index) => <li key={index}>
                  <div className="book">
                    <div className="book-top">
                    {(("imageLinks" in book) 
                    ?  
                     <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                     : 
                     <div className="book-cover" style={{ width: 128, height: 192 }}></div>)}
                      <div className="book-shelf-changer">
                        <select name={index} value={this.props.setSelect(book)} onChange={this.selectChange.bind(this)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {(("authors" in book) ? book.authors.map((author) => <div key={author} className="book-authors">{author}</div>) : "")}
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