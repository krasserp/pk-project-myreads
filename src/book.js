import React, {Component} from 'react'
import SelectList from './selectList'
import BookDetails from './bookdetails'
import PropTypes from 'prop-types'



/**
 * Class for book.
 *
 * @class      Book (name)
 * @prop       {object} bookItem - The book item containing all associated info (title, pages etc.)
 * @prop       {function } updateBook - Function that takes the books id and status to update the shelf via API call
 */


class Book extends Component{

    static propTypes = {
      bookItem: PropTypes.object.isRequired,
      updateBook: PropTypes.func.isRequired
    };

    state = {
        showDetails : false,

    };

    /**
     * Set the new shelf status for the current book
     *
     * @param      {string}  status - The new status for this book
     */
    updateShelfStatus(status){
        this.props.updateBook(this.props.bookItem.id,status);
    }


    /**
     * Switch the status to either show or hide the details view of the book
     *
     * @param      {bool}  showHide  - Ture or false to show the details view
     */
    showDetails(showHide){
        this.setState({
            showDetails: showHide
        })
    }

    render(){


    const {title, authors} = this.props.bookItem;
    const backgroundImage = this.props.bookItem.imageLinks.thumbnail !== '' ? this.props.bookItem.imageLinks.thumbnail :'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

    const overlay = this.state.showDetails ? <BookDetails bookItem={this.props.bookItem} updateShelfStatus={(status)=>{this.updateShelfStatus(status)}} showDetails={(showHide)=>{this.showDetails(showHide)}}  /> : null;

        return (

            <div className="book">
            {overlay}
              <div className="book-top">
                <div className="book-cover" style={{ backgroundImage:`url("${backgroundImage}")` }} onClick={()=>{this.showDetails(true)}}></div>
                <SelectList status={this.props.bookItem.shelf} updateShelfStatus={(status)=>{this.updateShelfStatus(status)}} />
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{authors ? authors.join(', '): 'unknown'}</div>
            </div>

        )
    }
}

export default Book;