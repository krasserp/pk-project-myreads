import React, {Component} from 'react'
import Book from './book'



class BookShelf extends Component{


    render(){
        const myType = this.props.listType;
        const myBooksList = this.props.books.filter( item => item.shelf === myType);

        return(

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {myBooksList.map((item,i) => (

                            <li key={i}>
                                <Book bookItem={item} />
                            </li>

                        ))}
                    </ol>
                  </div>
                </div>            
        )

    }
}

export default BookShelf