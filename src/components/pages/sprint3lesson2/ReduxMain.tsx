import React from "react";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";
import { store } from "./state/store";

export const ReduxMain = () => {
  return (
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  );
};
