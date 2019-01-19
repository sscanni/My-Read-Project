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
    shelf = ["currentlyReading", "wantToRead", "read"];
    state = {
        booksReading: [],
        booksWanttoRead: [],
        booksRead: [],
        books: [],
        bookSearchText: "",
    }
    componentDidMount() {
        console.log("componentDidMount")
        BooksAPI.getAll()
            .then((savedBooks) => {
                this.assignBookShelf(savedBooks)
            })
    }

    assignBookShelf(savedBooks) {
        let arr = savedBooks.filter((item) => {
            return item.shelf === "currentlyReading"
        })
        this.setState({ booksReading: arr })

        arr = savedBooks.filter((item) => {
            return item.shelf === "wantToRead"
        })
        this.setState({ booksWanttoRead: arr })

        arr = savedBooks.filter((item) => {
            return item.shelf === "read"
        })
        this.setState({ booksRead: arr })
    }

    updateBook(book, shelfParm) {
        BooksAPI.update(book, shelfParm)
            .then((resp) => {
            })
    }

    bookSearchChange = event => {
        let searchText = event.target.value;
        this.doSearch(searchText)

    };
    doSearch(searchText) {
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

    moveBook = (targetShelf, book) => {
        // Move the book to the taget bookshelf
        if (targetShelf === 'currentlyReading') {
            if (this.state.booksReading.findIndex(item => item.id === book.id) === -1) {
                this.updateBook(book, targetShelf)
                this.setState(prevState => ({
                    booksReading: [...prevState.booksReading, book]
                }));
            }
        }
        if (targetShelf === 'wantToRead') {
            if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) === -1) {
                this.updateBook(book, targetShelf)
                this.setState(prevState => ({
                    booksWanttoRead: [...prevState.booksWanttoRead, book]
                }));
            }
        }
        if (targetShelf === 'read') {
            if (this.state.booksRead.findIndex(item => item.id === book.id) === -1) {
                this.updateBook(book, targetShelf)
                this.setState(prevState => ({
                    booksRead: [...prevState.booksRead, book]
                }));
            }
        }
        if (targetShelf === 'none') {
            this.updateBook(book, targetShelf)
        }
        // If not the target category array then remove the book
        if (targetShelf !== 'currentlyReading') {
            if (this.state.booksReading.findIndex(item => item.id === book.id) > -1) {
                let newArr = this.state.booksReading.filter((item) => {
                    return item.id !== book.id
                })
                this.setState({ booksReading: newArr });
            }
        }
        if (targetShelf !== 'wantToRead') {
            if (this.state.booksWanttoRead.findIndex(item => item.id === book.id) > -1) {
                let newArr = this.state.booksWanttoRead.filter((item) => {
                    return item.id !== book.id
                })
                this.setState({ booksWanttoRead: newArr });
            }
        }
        if (targetShelf !== 'read') {
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
                            <ListBooks shelf={this.shelf[0]}
                                books={this.state.booksReading}
                                moveBook={this.moveBook}
                                setSelect={this.setSelect}
                            />
                            <ListBooks shelf={this.shelf[1]}
                                books={this.state.booksWanttoRead}
                                moveBook={this.moveBook}
                                setSelect={this.setSelect}
                            />
                            <ListBooks shelf={this.shelf[2]}
                                books={this.state.booksRead}
                                moveBook={this.moveBook}
                                setSelect={this.setSelect}
                            />
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
                            <ListBooks shelf={"search"}
                                books={this.state.books}
                                moveBook={this.moveBook}
                                setSelect={this.setSelect}
                            />
                        </div>
                    </div>
                )} />
            </div>
        )
    }
}

export default BooksApp
