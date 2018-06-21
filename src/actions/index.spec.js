import * as actions from './index'

describe('filter actions', () => {
  it('setViralImageFilter should create VIRAL_FILTER action', () => {
    expect(actions.setViralImageFilter(true)).toEqual({
      type: 'VIRAL_FILTER',
      filter: true
    })
  })

  it('setSortFilter should create SELECT_SORT action', () => {
    expect(actions.setSortFilter('viral')).toEqual({
      type: 'SELECT_SORT',
      filter: 'viral'
    })
  })

  it('setSectionFilter should create SELECT_SECTION action', () => {
    expect(actions.setSectionFilter('hot')).toEqual({
      type: 'SELECT_SECTION',
      filter: 'hot'
    })
  })

  it('setwindowFilter should create SELECT_WINDOW_PARAMETERS action', () => {
    expect(actions.setwindowFilter('day')).toEqual({
      type: 'SELECT_WINDOW_PARAMETERS',
      filter: 'day'
    })
  })

  it('applyfilter should create APPLY_FILTERS action', () => {
    expect(actions.applyfilter('hot/viral/day')).toEqual({
      type: 'APPLY_FILTERS',
      filter: 'hot/viral/day'
    })
  })

  it('selectImage should create SELECT_IMAGE action', () => {
    expect(actions.selectImage({id: 'fJhkfl', up: 123})).toEqual({
      type: 'SELECT_IMAGE',
      image: {id: 'fJhkfl', up: 123}
    })
  })

  it('requestImages should create IMAGES_REQUEST action', () => {
    expect(actions.requestImages('hot/viral/day')).toEqual({
      type: 'IMAGES_REQUEST',
      filter: 'hot/viral/day'
    })
  })
})