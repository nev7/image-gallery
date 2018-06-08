import React, { Component } from 'react';
import '../styles/Picker.css';

class Picker extends Component {
  render() {
    const { value, onChange, options, type } = this.props;

    return (
        <select className="picker" onChange={e => onChange(e.target.value, type)} value={value}>
            {options.map(option => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    )
  }
}

export default Picker;