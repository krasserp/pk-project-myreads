import React, {Component} from 'react'
import Book from './book'



class BookShelf extends Component{

    state= {
        books: []
    }

    
    updateBook(id,status){
        this.props.updateBook(id,status);
    }


    componentWillReceiveProps(props){

        let filterd = props.listType !== 'search' ? props.books.filter( item => item.shelf === props.listType) : props.books

        this.setState({
            books : filterd
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

export default BookShelf