import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configStore from '../configStore';
import App from '../containers/App';

const store = configStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}