import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './bookshelfs'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'


/**
 * Class for search and results.
 *
 * @class      SearchAndResults (name)
 *
 * prop       {array} booklist - Array of all books returned from the API call
 * prop       {function} updateBook - Takes the book id and status to update the status of that book
 *
 */

class SearchAndResults extends Component{

    static propTypes = {
      booklist: PropTypes.array.isRequired,
      updateBook: PropTypes.func.isRequired
    };

    state= {
        books: [],
        query: '',
        booklist: [],
        booklistIds:[]
    };

    updateQuery = (query) => {
        this.setState({query: query.trim()});
        BooksAPI.search(query.trim(),20).then((result) => {

            if(result !== undefined && result.constructor === Array){

                let setStateList = result.map(item => {
                    if(this.state.booklistIds.indexOf(item.id) > -1){
                        let foundItem = this.state.booklist.filter(book=>book.id === item.id);
                        item.shelf = foundItem[0].shelf;
                    }
                    return item;
                });

                this.setState({books :setStateList});
            }
            else{
               this.setState({books: []});
            }

        });

    }

    updateBook(id,status){
        this.props.updateBook(id,status);

        let updatedBooks = this.state.books.map(book => {
            if(book.id === id){
                book.shelf = status;
            }
            return book;
        })

        this.setState({books: updatedBooks});

    }


    componentWillMount(){

        this.setState({
            booklist: this.props.booklist,
            booklistIds : this.props.booklist.map(item => item.id)
        });
    }

    componentWillReceiveProps(){

        // if the search page gets hit need to call the api
        // else the props are empty for the booklist even though I find that odd
        // as the state gets set in the promise
        if (this.props.booklist.length < 1){
            BooksAPI.getAll().then((books) => {
              this.setState({
                booklist: books,
                booklistIds: books.map(item => item.id)
                })
            })
        }

        else{
            this.setState({
                booklist: this.props.booklist,
                booklistIds : this.props.booklist.map(item => item.id)
            });
        }


    }

    render(){


        const {query} = this.state

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                to='/'
                className="close-search"
                >
                Close
                </Link>
              <div className="search-books-input-wrapper">

                <input type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>
            {this.state.books.length > 0 ? (

            <div className="search-books-results">
              <BookShelf updateBook={(id,status)=>{this.updateBook(id,status)}} listType='search' books={this.state.books} shelfTitle='Search Result' />
            </div>


            ) : '' }

          </div>
        )

    }


}

export default SearchAndResults;