import fetch from 'cross-fetch';

export const IMAGES_REQUEST = 'IMAGES_REQUEST';
export const IMAGES_SUCCESS = 'IMAGES_SUCCESS';
export const IMAGES_FAILURE = 'IMAGES_FAILURE';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SELECT_WINDOW_PARAMETERS = 'SELECT_WINDOW_PARAMETERS';
export const SELECT_SECTION = 'SELECT_SECTION';
export const SELECT_SORT = 'SELECT_SORT';
export const VIRAL_FILTER = 'VIRAL_FILTER';
export const SELECT_IMAGE = 'SELECT_IMAGE';

const API_ROOT = 'https://api.imgur.com/3/gallery/';
const HEADER_DATA = {
    headers: {
        'Authorization': 'Client-ID e6bf40cd50a01b6'
    }
};

//action used for setting the viral image filter
export function setViralImageFilter(filter) {
    return {
        type: VIRAL_FILTER,
        filter
    }
}

//action used for setting the sort filter
export function setSortFilter(filter) {
    return {
        type: SELECT_SORT,
        filter
    }
}

//action used for setting the section filter
export function setSectionFilter(filter) {
    return {
        type: SELECT_SECTION,
        filter
    }
}

//action used for setting the window filter
export function setwindowFilter(filter) {
    return {
        type: SELECT_WINDOW_PARAMETERS,
        filter
    }
}

//action used for applying a filter
export function applyfilter(filter) {
    return {
        type: APPLY_FILTERS,
        filter
    }
}

//action used for the selected image
export function selectImage(image) {
    return {
        type: SELECT_IMAGE,
        image
    }
}

//action for requesting images
export function requestImages(filter) {
    return {
        type: IMAGES_REQUEST,
        filter
    }
}

//action for images received
export function receiveImages(filter, json) {
    return {
        type: IMAGES_SUCCESS,
        filter,
        images: json.data.map(child => child),
        receivedAt: Date.now()
    }
}

//action for rejected api call
export function rejectedImages(filter, response) {
    return {
        type: IMAGES_FAILURE,
        filter,
        error: response.status,
        images: [],
        receivedAt: Date.now()
    }
}

//fetching images from api
export function fetchImages(filter) {
    return dispatch => {
        dispatch(requestImages(filter));
        return fetch(API_ROOT + filter, HEADER_DATA)
            .then(response => {
                if (!response.ok) {
                    dispatch(rejectedImages(filter, response));
                } else {
                    return response.json()
                }
            })
            .then(json => dispatch(receiveImages(filter, json)));
    }
}

//checking if images for a filter are present
function shouldFetchImages(state, filter) {
    const images = state.imagesByFilter[filter];

    if (!images) {
        return true;
    } else if (images.isFetching) {
        return false;
    } else {
        return images.didInvalidate;
    }
}

//fetch images for a filter only if they are not fetched already
export function fetchImagesIfNeeded(filter) {
    return (dispatch, getState) => {
        if (shouldFetchImages(getState(), filter)) {
            return dispatch(fetchImages(filter));
        }
    }
}