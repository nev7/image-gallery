import React, { Component } from 'react';
import '../styles/CheckBox.css';

class CheckBox extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
        <input type='checkbox' className="check-box" onChange={() => onChange(value)} value={value} checked={value}/>
    )
  }
}

export default CheckBox;