import React from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { TodoAPI } from "./TodoAPI";

export const MainAPI = () => {
  return (
    <div>
      <Provider store={store}>
        <TodoAPI />
      </Provider>
    </div>
  );
};
