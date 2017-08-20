import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './bookshelfs'
import SearchAndResults from './searchAndResults'
import * as BooksAPI from './BooksAPI'
import './App.css'


/**
 * Class for books application.
 *
 * @class      BooksApp (name)  handles the application
 */


class BooksApp extends React.Component {

  state = {
    books: []
  };

  /**
   * fetch books from API
   */
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }



  /**
   * { Takes the book id and status to update the status of that book }
   *
   * @param      {string}  id     - The identifier
   * @param      {string}  status - The status
   */
  updateBookCategory(id,status){

    BooksAPI.update({id:id},status)
      .then((result) => {

        let alreadyInState = false;

        this.setState( (state) => ({
          books: state.books.map( item => {

            if(item.id === id){
              item.shelf = status;
              alreadyInState = true;
            }
            return item;
          })
        })

        );

        if(!alreadyInState){
          BooksAPI.get(id).then((book) => {
            this.setState(state => ({
              books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }));
        });
        }
    });

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

export default BooksApp;