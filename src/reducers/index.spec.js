import { createStore } from 'redux';
import rootReducer from '../reducers';

let store = createStore(rootReducer);

describe('filter reducers initial states', () => {
  it('should handle initial filter state', () => {
    expect(store.getState().sortFilter).toEqual('viral')
    expect(store.getState().viralFilter).toEqual(true)
    expect(store.getState().sectionFilter).toEqual('hot')
    expect(store.getState().windowFilter).toEqual('day')
    expect(store.getState().appliedFilter).toEqual('hot/viral/day')
    expect(store.getState().selectedImage).toEqual(null)
  })
})

describe('filter reducers change states', () => {
  it('should handle state change', () => {
    let action = { type: 'SELECT_SECTION', filter: 'top' }
    store.dispatch(action)
    expect(store.getState().sectionFilter).toEqual('top')
  })

  it('should handle selected image state change', () => {
    let action = { type: 'SELECT_IMAGE', image: {id:1} }
    store.dispatch(action)
    expect(store.getState().selectedImage).toEqual({id:1})
  })
})