import React, {Component} from 'react'

const selectClass = 'book-shelf-changer';

const selectItems = [
    { value: 'none', text: 'Move to...', selected: false, disabled: false},
    { value: 'currentlyReading', text: 'Currently Reading', selected: false, disabled: false},
    { value: 'wantToRead', text: 'Want to Read', selected: false, disabled: false},
    { value: 'read', text: 'Read', selected: false, disabled: false},
    { value: 'none', text: 'None', selected: false, disabled: false}
  ];


class SelectList extends Component{

    state= {
      selected: this.props.status
    }

    updateSelection = (value) => {
      this.setState({selected: value.trim()})
    }

    render(){

    return (

          <div className={selectClass}>
               <select value={this.state.selected} onChange={(event) => this.updateSelection(event.target.value)}>
                {selectItems.map((item,i) => (
                  <option key={i} value={item.value} disabled={item.disabled} >{item.text}</option>
                ))}
               </select>
          </div>

      )
    }
}


export default SelectList