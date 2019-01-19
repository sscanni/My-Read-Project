import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
//----------------------------------------------------------------------
// Changes to still make:
// - Display multiple authors - COMPLETED
// - Change arrow down button when mouse hover.
// - if book image does not exist then show default image
// - Save books using api
// - search for books with input field
// - add propType to components
//----------------------------------------------------------------------
class BooksApp extends React.Component {
  state = {
    booksReading: [],
    booksWanttoRead: [],
    booksRead: [],
    books: [],
    cat: ["currentlyReading", "wantToRead", "read"],
    bookSearchText: "",

    testbooks: [],
    shelfParm: "",
    testbook: []
  }
  componentDidMount() {

    BooksAPI.getAll()
      .then((testbooks) => {
          this.setState(() => ({
            testbooks
          }))
          this.assignBookShelf()
      })
  }

  assignBookShelf () {
    let newArr = this.state.testbooks.filter((item) => {
        return item.shelf === "currentlyReading"
    })

    this.setState({ booksReading: newArr })
    newArr = this.state.testbooks.filter((item) => {
        return item.shelf === "wantToRead"
    })
    this.setState({ booksWanttoRead: newArr })

    newArr = this.state.testbooks.filter((item) => {
        return item.shelf === "read"
    })
    this.setState({ booksRead: newArr })
  }
  
  updateBook (book, shelfParm) {
      BooksAPI.update(book, shelfParm)  
    .then((resp) => {
        console.log("resp", resp)
        this.getBooks()
    })
  }
  getBooks () {
    BooksAPI.getAll()
      .then((testbooks) => {
          this.setState(() => ({
            testbooks
          }))
    })
  }

  bookSearchChange = event => {
    let searchText = event.target.value;
    this.doSearch(searchText)

  };    
  doSearch (searchText) {
    if (searchText.trim()) {
        BooksAPI.search(searchText)  
        .then((books) => {
            if (typeof books === 'object' && "error" in books) {
                this.setState({ books: [] })
            } else {
                this.setState(() => ({ books }))
            }
        })
    } else {
        this.setState({ books: [] })
    }
    this.setState({ bookSearchText: searchText });
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
          this.updateBook (book, 'currentlyReading') 
          this.setState(prevState => ({
          booksReading: [...prevState.booksReading, book] }));
      }
    }
    if (targetCat === 'wantToRead') {
      if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) === -1) {
        this.updateBook (book, 'wantToRead') 
          this.setState(prevState => ({
          booksWanttoRead: [...prevState.booksWanttoRead, book] }));
      }
    }
    if (targetCat === 'read') {
      if (this.state.booksRead.findIndex(item => item.id === book.id) === -1) {
        this.updateBook (book, 'read') 
          this.setState(prevState => ({
          booksRead: [...prevState.booksRead, book] }));
      }
    }
    if (targetCat === 'none') {
        this.updateBook (book, 'none') 
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
            <Route exact path='/' render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div>
                    {/* <ListBooks cat={this.state.cat[0]} books={this.state.booksReading} moveBook={this.moveBook} setSelect={this.setSelect}/> */}
                    <ListBooks 
                        cat={this.state.cat[0]} 
                        books = {this.state.booksReading.filter((item) => {return item.shelf === this.state.cat[0]})}
                        moveBook={this.moveBook} setSelect={this.setSelect}
                    />
                    <ListBooks cat={this.state.cat[1]} books={this.state.booksWanttoRead} moveBook={this.moveBook} setSelect={this.setSelect}/>
                    <ListBooks cat={this.state.cat[2]} books={this.state.booksRead} moveBook={this.moveBook} setSelect={this.setSelect}/>
                    <div className="open-search">
                      <Link to='/search' className="open-search-button">Add a book</Link>
                    </div>
                  </div>
                </div>
            )} />
            <Route path='/search' render={() => (
                <div className="search-books">
                    <div className="search-books-bar">
                       <Link to='/' className="close-search">Close</Link>
                       <div className="search-books-input-wrapper">
                          <input type="text" placeholder="Search by title or author"
                            value={this.state.bookSearchText}
                            onChange={this.bookSearchChange} />
                       </div>
                    </div>
                    <div className="search-books-results">                       
                        <ListBooks cat={"search"} books={this.state.books} moveBook={this.moveBook} setSelect={this.setSelect}/>
                    </div>
                </div>
            )} />
      </div>
    )
  }
}

export default BooksApp
