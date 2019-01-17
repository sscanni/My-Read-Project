import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
// Reminders:
// 1) Display multiple authors
//
class BooksApp extends React.Component {
  state = {
    booksReading: [],
    booksWanttoRead: [],
    booksRead: [],
    books: [],
    cat: ["currentlyReading", "wantToRead", "read"],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.search("Web Development")
      .then((booksReading) => {
          this.setState(() => ({
            booksReading
          }))
      })
      BooksAPI.search("poetry")
      .then((booksWanttoRead) => {
          this.setState(() => ({
            booksWanttoRead
          }))
      })
      BooksAPI.search("Programming")
      .then((booksRead) => {
          this.setState(() => ({
            booksRead
          }))
      })
  }
      
  setSelect = (book) => {
    if (this.state.booksReading.findIndex(item => item.id === book.id) > -1) {
        return "currentlyReading";
    }
    if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) > -1) {
        return "wantToRead";
    }
    if (this.state.booksRead.findIndex(item => item.id === book.id) > -1) {
        return "read";
    }  
    return "none";
  }

  moveBook = (targetCat, book) => {
    // Move the book to the taget bookshelf
    if (targetCat === 'currentlyReading') {
      if (this.state.booksReading.findIndex(item => item.id === book.id) === -1) {
          this.setState(prevState => ({
          booksReading: [...prevState.booksReading, book] }));
      }
    }
    if (targetCat === 'wantToRead') {
      if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) === -1) {
          this.setState(prevState => ({
          booksWanttoRead: [...prevState.booksWanttoRead, book] }));
      }
    }
    if (targetCat === 'read') {
      if (this.state.booksRead.findIndex(item => item.id === book.id) === -1) {
          this.setState(prevState => ({
          booksRead: [...prevState.booksRead, book] }));
      }
    }
    // If not the target category array then remove the book
    if (targetCat !== 'currentlyReading') {
      if (this.state.booksReading.findIndex(item => item.id === book.id) > -1) {
          let newArr = this.state.booksReading.filter((item) => {
              return item.id !== book.id
          })
          this.setState({ booksReading: newArr }); 
      }
    }
    if (targetCat !== 'wantToRead') {
        if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) > -1) {
            let newArr = this.state.booksWanttoRead.filter((item) => {
                return item.id !== book.id
            })
            this.setState({ booksWanttoRead: newArr }); 
        }      
    }
    if (targetCat !== 'read') {
      if (this.state.booksRead.findIndex(item => item.id === book.id) > -1) {
        let newArr = this.state.booksRead.filter((item) => {
            return item.id !== book.id
        })
        this.setState({ booksRead: newArr }); 
      }
    }
  };
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks cat={this.state.cat[0]} books={this.state.booksReading} moveBook={this.moveBook} setSelect={this.setSelect}/>
            <ListBooks cat={this.state.cat[1]} books={this.state.booksWanttoRead} moveBook={this.moveBook} setSelect={this.setSelect}/>
            <ListBooks cat={this.state.cat[2]} books={this.state.booksRead} moveBook={this.moveBook} setSelect={this.setSelect}/>
          </div>
        )}
        <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksApp
