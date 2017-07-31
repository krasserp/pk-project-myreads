import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SelectList from './selectList'


/**
 * Class for book details.
 *
 * @class      BookDetails (name)
 *
 * @prop       {object} bookItem - The book object holding all the books info (title, status, nbr. pages etc.)
 * @prop       {function} updateShelfStatus - Function which takes the new status to update the book status via API call
 * @prop       {function} showDetails - function to show or hide this detailed view
 */


class BookDetails extends Component{

    static propTypes = {
      bookItem: PropTypes.object.isRequired,
      updateShelfStatus: PropTypes.func.isRequired,
      showDetails: PropTypes.func.isRequired
    };

    /**
     * Shows the details.
     *
     * @param      {bool}  val   - Show or not value
     */
    showDetails= (val) =>{
        this.props.showDetails(val);
    }

    /**
     * Set the new shelf value (status) of this book
     *
     * @param      {string}  status - The status
     */
    updateShelfStatus(status){
        this.props.updateShelfStatus(status);
        this.showDetails(false);
    }

    render(){
        return(

            <div id="generic-overlay">

                <span id="close-btn" onClick={()=>{this.showDetails(false)}}>x</span>

                <div className='overlay-content' >
                    <div className='nav-holder'>
                        <img alt="book cover" src={this.props.bookItem.imageLinks.thumbnail !== '' ? this.props.bookItem.imageLinks.thumbnail :'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}/>

                        <SelectList status={this.props.bookItem.shelf} updateShelfStatus={(status)=>{this.updateShelfStatus(status)}} />
                    </div>
                    <div className='item-details'>
                        <h2>{this.props.bookItem.title}</h2>
                        <h3>Description:</h3>
                        <p>
                            {this.props.bookItem.description}
                        </p>

                    </div>

                </div>

            </div>

        )
    }
}

export default BookDetails;