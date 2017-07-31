import React, {Component} from 'react'
import Book from './book'
import sortBy from  'sort-by'
import PropTypes from 'prop-types'


/**
 * Class for book shelf.
 *
 * @class      BookShelf (name)
 *
 *@prop       {function} updateBook - Takes the book id and status to update the status of that book
 *@prop       {string} listType - Defines the bookshelf via filtering the books by this type
 *@prop       {array} books - Array of all books returned from the API call
 *@prop       {string} shelfTitle - Title of the current shelf
 */

class BookShelf extends Component{

    static propTypes = {
      updateBook: PropTypes.func.isRequired,
      listType: PropTypes.string.isRequired,
      books: PropTypes.array.isRequired,
      shelfTitle: PropTypes.string.isRequired
    };


    state = {
        books: []
    };

  /**
   * Takes the book id and status to update the status of that book
   *
   * @param      {string}  id     - The identifier
   * @param      {string}  status - The status
   */
    updateBook(id,status){
        this.props.updateBook(id,status);
    }


    componentWillReceiveProps(props){

        let filterd = props.listType !== 'search' ? props.books.filter( item => item.shelf === props.listType) : props.books;

        this.setState({
            books : filterd.sort(sortBy('title'))
        });

    }



    render(){

        return(

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.state.books.map((item,i) => (

                            <li key={i}>
                                <Book bookItem={item} updateBook={(id,status)=>{this.updateBook(id,status)}} />
                            </li>

                        ))}
                    </ol>
                  </div>
                </div>
        )

    }
}

export default BookShelf;