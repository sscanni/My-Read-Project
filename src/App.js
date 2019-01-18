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
//----------------------------------------------------------------------
class BooksApp extends React.Component {
  state = {
    booksReading: [],
    booksWanttoRead: [],
    booksRead: [],
    books: [],
    cat: ["currentlyReading", "wantToRead", "read"],
    bookSearchText: "",
    tempbooks: []
  }
  componentDidMount() {

    // BooksAPI.search("Web")
    //   .then((booksReading) => {
    //       this.setState(() => ({
    //         booksReading
    //       }))
    //   })



    // BooksAPI.search("Web Development")
    //   .then((booksReading) => {
    //       this.setState(() => ({
    //         booksReading
    //       }))
    //   })
    //   BooksAPI.search("poetry")
    //   .then((booksWanttoRead) => {
    //       this.setState(() => ({
    //         booksWanttoRead
    //       }))
    //   })
    //   BooksAPI.search("Programming")
    //   .then((booksRead) => {
    //       this.setState(() => ({
    //         booksRead
    //       }))
    //   })
    // BooksAPI.getAll()
    //   .then((books) => {
    //       this.setState(() => ({
    //         books
    //       }))
    //   })
  }
  bookSearchChange = event => {
    event.persist();
    let searchText = event.target.value;
    this.doSearch(searchText)

  };    
  doSearch (searchText) {
    console.log(searchText)
    BooksAPI.search(searchText)  
    .then((tempbooks) => {
        if (typeof tempbooks === 'object') {
            if ("error" in tempbooks) {
                this.setState({ tempbooks: [] })
                this.setState({ books: [] })
            } else {
                 this.setState({ books: tempbooks })
            }
        } else {
            if (tempbooks) {
                this.setState({ books: tempbooks })
            } else {
                 this.setState({ tempbooks: [] })
                 this.setState({ books: [] })
            }
        }
        this.setState({ bookSearchText: searchText });
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
            <Route exact path='/' render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div>
                  <div>
                    <ListBooks cat={this.state.cat[0]} books={this.state.booksReading} moveBook={this.moveBook} setSelect={this.setSelect}/>
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
