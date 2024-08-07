import React from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Sp3Le4TodoStoryBook } from "./Sp3Le4TodoStoryBook";

export const Sp3Le4MainStoryBook = () => {
  return (
    <div>
      <Provider store={store}>
        <Sp3Le4TodoStoryBook />
      </Provider>
    </div>
  );
};
