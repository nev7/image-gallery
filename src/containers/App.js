import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  applyfilter,
  fetchImagesIfNeeded,
  setSortFilter,
  setSectionFilter,
  setwindowFilter,
  setViralImageFilter,
  selectImage,
} from '../actions';
import Picker from '../components/Picker';
import CheckBox from '../components/CheckBox';
import GalleryThumbs from '../components/GalleryThumbs';
import GalleryImage from '../components/GalleryImage';
import ApplyFilter from '../components/ApplyFilter';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleImage = this.toggleImage.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
  }

  componentDidMount() {
    const { dispatch, appliedFilter } = this.props
    dispatch(fetchImagesIfNeeded(appliedFilter))
  }

  componentDidUpdate(prevProps) {
    if (this.props.appliedFilter !== prevProps.appliedFilter) {
      const { dispatch, appliedFilter } = this.props
      dispatch(fetchImagesIfNeeded(appliedFilter))
    }
  }

  toggleImage(image) {
    this.props.dispatch(selectImage(image))
  }

  handleApplyFilter(fullFilter) {
    this.props.dispatch(applyfilter(fullFilter))
  }

  handleCheckBoxChange(nextFilter) {
    this.props.dispatch(setViralImageFilter(!nextFilter))
  }

  handleSelectChange(nextFilter, type) {
    switch (type) {
      case 'sort':
        this.props.dispatch(setSortFilter(nextFilter))
        break;
      case 'section':
        this.props.dispatch(setSectionFilter(nextFilter))
        break;
      case 'window':
        this.props.dispatch(setwindowFilter(nextFilter))
        break;
      default:
        break;
    }
  }

  render() {
    const { 
      images, 
      sortFilter, 
      sectionFilter, 
      windowFilter, 
      viralFilter, 
      selectedImage 
    } = this.props

    return (
      <div className="App">
          <div className="SideBar">
            <div className="sidebar-header">iGallery</div>
            <h3>Apply Filters: </h3>
            <h4>Choose Section</h4>
            <Picker
              value={sectionFilter}
              onChange={this.handleSelectChange}
              options={['hot', 'top', 'user']}
              type='section'
            />
            <h4>Sort By</h4>
            <Picker
              value={sortFilter}
              onChange={this.handleSelectChange}
              options={['viral', 'top', 'time']}
              type='sort'
            />
            <h4>View By</h4>
            <Picker
              value={windowFilter}
              onChange={this.handleSelectChange}
              options={['day', 'week', 'month', 'year', 'all']}
              type='window'
            />
            <h4>Include Viral Images:</h4>
            <CheckBox
              value={viralFilter}
              onChange={this.handleCheckBoxChange}
            />
            <ApplyFilter 
              onClick={ this.handleApplyFilter } 
              sectionFilter={sectionFilter}
              sortFilter={sortFilter}
              windowFilter={windowFilter}
              viralFilter={viralFilter}
            />
        </div>
        <div className="Grid">
          <GalleryThumbs 
            selectImage={this.toggleImage} 
            images={images}
          />
          <GalleryImage 
            image={selectedImage} 
            onClick={this.toggleImage}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { 
    appliedFilter, 
    imagesByFilter, 
    sortFilter, 
    sectionFilter, 
    windowFilter, 
    viralFilter, 
    selectedImage 
  } = state

  const {
    isFetching,
    lastUpdated,
    items: images
  } = imagesByFilter[appliedFilter] || {
    isFetching: true,
    items: []
  }

  return {
    sortFilter,
    sectionFilter,
    windowFilter,
    appliedFilter,
    selectedImage,
    viralFilter,
    images,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App);
