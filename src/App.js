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
      BooksAPI.search("React")
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
  moveBook = (targetCat, book) => {

    // Move the book to the taget category array
    if (targetCat === 'currentlyReading') {
        let arr = this.state.booksReading.filter((item) => {
        return item.id === book.id
      })
      if (arr.length === 0) {
          this.setState(prevState => ({
          booksReading: [...prevState.booksReading, book] }));
      }
    }
    if (targetCat === 'wantToRead') {
      let arr = this.state.booksWanttoRead.filter((item) => {
      return item.id === book.id
      })
      if (arr.length === 0) {
          this.setState(prevState => ({
          booksWanttoRead: [...prevState.booksWanttoRead, book] }));
      }
    }
    if (targetCat === 'read') {
        let arr = this.state.booksRead.filter((item) => {
        return item.id === book.id
      })
      if (arr.length === 0) {
          this.setState(prevState => ({
          booksRead: [...prevState.booksRead, book] }));
      }
    }
    // If not the target category array then remove the book
    if (targetCat !== 'currentlyReading') {
        let arr = this.state.booksReading.filter((item) => {
            return item.id === book.id
        })
        if (arr.length > 0) {
          let newArr = this.state.booksReading.filter((item) => {
          return item.id !== book.id
        })
        this.setState({ booksReading: newArr }); 
      }
    }
    if (targetCat !== 'wantToRead') {
        let arr = this.state.booksWanttoRead.filter((item) => {
        return item.id === book.id
      })
      if (arr.length > 0) {
        let newArr = this.state.booksWanttoRead.filter((item) => {
            return item.id !== book.id
        })
        this.setState({ booksWanttoRead: newArr }); 
      }
    }
    if (targetCat !== 'read') {
        let arr = this.state.booksRead.filter((item) => {
        return item.id === book.id
      })
      if (arr.length > 0) {
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
            <ListBooks cat={this.state.cat[0]} books={this.state.booksReading} moveBook={this.moveBook}/>
            <ListBooks cat={this.state.cat[1]} books={this.state.booksWanttoRead} moveBook={this.moveBook}/>
            <ListBooks cat={this.state.cat[2]} books={this.state.booksRead} moveBook={this.moveBook}/>
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
