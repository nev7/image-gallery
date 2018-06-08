import {
  combineReducers
} from 'redux';
import {
  APPLY_FILTERS,
  IMAGES_REQUEST,
  IMAGES_SUCCESS,
  IMAGES_FAILURE,
  SELECT_SORT,
  SELECT_SECTION,
  SELECT_WINDOW_PARAMETERS,
  SELECT_IMAGE,
  VIRAL_FILTER,
} from '../actions/index';

function sortFilter(state = 'viral', action) {
  switch (action.type) {
    case SELECT_SORT:
      return action.filter;
    default:
      return state;
  }
}

function viralFilter(state = true, action) {
  switch (action.type) {
    case VIRAL_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function sectionFilter(state = 'hot', action) {
  switch (action.type) {
    case SELECT_SECTION:
      return action.filter;
    default:
      return state;
  }
}

function windowFilter(state = 'day', action) {
  switch (action.type) {
    case SELECT_WINDOW_PARAMETERS:
      return action.filter;
    default:
      return state;
  }
}

function appliedFilter(state = 'hot/viral/day', action) {
  switch (action.type) {
    case APPLY_FILTERS:
      return action.filter;
    default:
      return state;
  }
}

function selectedImage(state = null, action) {
  switch (action.type) {
    case SELECT_IMAGE:
      return action.image
    default:
      return state;
  }
}

function images(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  }, action) {
  switch (action.type) {
    case IMAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case IMAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.images,
        lastUpdated: action.receivedAt
      })
    case IMAGES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [],
        lastUpdated: action.receivedAt
      })
    default:
      return state;
  }
}

function imagesByFilter(state = {}, action) {
  switch (action.type) {
    case IMAGES_SUCCESS:
    case IMAGES_REQUEST:
    case SELECT_IMAGE:
      return Object.assign({}, state, {
        [action.filter]: images(state[action.filter], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  imagesByFilter,
  appliedFilter,
  sortFilter,
  sectionFilter,
  windowFilter,
  selectedImage,
  viralFilter,
})

export default rootReducer