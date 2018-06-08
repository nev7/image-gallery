import React, { Component } from 'react';
import '../styles/ApplyFilter.css';

class ApplyFilter extends Component {
    render() {
      const { 
        sectionFilter,
        sortFilter, 
        windowFilter, 
        viralFilter, 
        onClick 
      } = this.props

      const fullFilter = sectionFilter + '/' + sortFilter + '/' + windowFilter + '/?showViral=' + viralFilter;

      return (
          <button className='apply-filter' onClick={function(){ onClick(fullFilter) }} >Apply Filters</button>
      )
    }
  }
  
  export default ApplyFilter;