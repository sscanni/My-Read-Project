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
    cat: ["Currently Reading", "Want to Read", "Read"],
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
  selectChange = (catSelect, book) => {
    console.log(catSelect)
    console.log(book.title)
    this.moveBook(catSelect, book)
  };

  //----------------------------------------
// Add/Move a book to the READING array
//----------------------------------------
moveBook = (catSelected, book) => {

  // Add/Move a book to the appropriate array
  if (catSelected === 'currentlyReading') {
      let arr = this.state.booksReading.filter((item) => {
      return item.id === book.id
    })
    if (arr.length === 0) {
        this.setState(prevState => ({
        booksReading: [...prevState.booksReading, book] }));
    }
  }
  if (catSelected === 'wantToRead') {
     let arr = this.state.booksWanttoRead.filter((item) => {
     return item.id === book.id
    })
    if (arr.length === 0) {
        this.setState(prevState => ({
        booksWanttoRead: [...prevState.booksWanttoRead, book] }));
    }
  }
  if (catSelected === 'read') {
      let arr = this.state.booksRead.filter((item) => {
      return item.id === book.id
    })
    if (arr.length === 0) {
        this.setState(prevState => ({
        booksRead: [...prevState.booksRead, book] }));
    }
  }
  // Remove book from the appropriate array
  if (catSelected !== 'currentlyReading') {
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
  if (catSelected !== 'wantToRead') {
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
  if (catSelected !== 'read') {
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
            <ListBooks cat={this.state.cat[0]} books={this.state.booksReading} selectChange={this.selectChange}/>
            <ListBooks cat={this.state.cat[1]} books={this.state.booksWanttoRead} selectChange={this.selectChange}/>
            <ListBooks cat={this.state.cat[2]} books={this.state.booksRead} selectChange={this.selectChange}/>
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
