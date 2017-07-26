import React, {Component} from 'react'
import SelectList from './selectList'


class Book extends Component{


    updateShelfStatus(status){
        this.props.updateBook(this.props.bookItem.id,status);
    }

    render(){

    //this.updateStatusShelf(this.props.shelf);

    const {title, authors} = this.props.bookItem;
    const backgroundImage = this.props.bookItem.imageLinks.thumbnail !== '' ? this.props.bookItem.imageLinks.thumbnail :'https://books.google.com/googlebooks/images/no_cover_thumb.gif'; 

        return (

            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ backgroundImage:`url("${backgroundImage}")` }}></div>
                <SelectList status={this.props.bookItem.shelf} updateShelfStatus={(status)=>{this.updateShelfStatus(status)}} />
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{authors ? authors.join(', '): 'unknown'}</div>
            </div>

        )
    }
}

export default Book




