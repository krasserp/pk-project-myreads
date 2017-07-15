import React, {Component} from 'react'
import SelectList from './selectList'

class Book extends Component{


    state= {
        imgWidth: 0,
        imgHeight : 0
    }

    // shift this to css rather,...
    updateImgDimensions(imgPath){
        let img = new Image();

        img.onload = () => {
            this.setState({imgWidth:img.width, imgHeight:img.height});
        }

        img.src = imgPath;
    }

    render(){

        let {title, authors, shelf } = this.props.bookItem;
        let backgroundImage = this.props.bookItem.imageLinks.thumbnail;
        if(this.state.imgWidth === 0 || this.state.imgHeight ===0 ){
            this.updateImgDimensions(backgroundImage)
        }

        return (

            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width:`${this.state.imgWidth}px`, height:`${this.state.imgHeight}px`,backgroundImage:`url("${backgroundImage}")` }}></div>
                <SelectList status={shelf}/>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{authors.join(', ')}</div>
            </div>

        )
    }
}

export default Book




