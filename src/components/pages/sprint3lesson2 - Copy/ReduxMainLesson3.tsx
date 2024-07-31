import React from "react";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";
import { store } from "./state/store";

export const ReduxMainLesson3 = () => {
  return (
    <div >
      <Provider store={store}>
        <AppWithRedux />
      </Provider>
    </div>
  );
};
