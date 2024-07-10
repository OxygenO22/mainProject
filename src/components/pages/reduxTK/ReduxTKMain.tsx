import React from 'react'
import { ReduxTKToDo } from './ReduxTKToDo'
import { Provider } from 'react-redux'
import store from './store/store';

export const ReduxTKMain = () => {
  return (
    <Provider store={store}>
      <ReduxTKToDo />
    </Provider>
  );
}
