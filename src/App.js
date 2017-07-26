import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './bookshelfs'
import SearchAndResults from './searchAndResults'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount(){
    console.log('main app mounted? ');
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      console.log('updated books state');
    })
  }


  componentWillReceiveProps(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBookCategory(id,status){

    this.setState( (state) => ({
      
      books: state.books.map( item => {
        let book;
        if(item.id === id){
          item.shelf = status;
          book = item;
        } else {
          book = item
        }
        return book;
    })
    })
    )

    let theBook = this.state.books.filter(item => item.id === id);
    //don't get why but seems the id needs to be set again?
    theBook.id = id;
    //console.log(theBook, ' yes that one',theBook.id, status, id);

    BooksAPI.update(theBook,status).then((result)=> console.log(result));
  }


  render() {
    return (
      <div className="app">
        <Route  path="/search" render={({history}) =>(
          <SearchAndResults 
            booklist={this.state.books}  
            updateBook={(id,status)=>{this.updateBookCategory(id,status)}} 
          />
        )}
        />

        <Route exact path='/' render={() =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf updateBook={(id,status)=>{this.updateBookCategory(id,status)}} listType='currentlyReading' books={this.state.books} shelfTitle='Currently Reading'/>
                <BookShelf updateBook={(id,status)=>{this.updateBookCategory(id,status)}} listType='wantToRead' books={this.state.books} shelfTitle='Want to Read' />
                <BookShelf updateBook={(id,status)=>{this.updateBookCategory(id,status)}} listType='read' books={this.state.books} shelfTitle='Read' />
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                >
                Add a book
              </Link>
            </div>
          </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
