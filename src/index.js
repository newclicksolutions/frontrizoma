import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, persistedStore } from "./store/store";
import { JournalApp } from "./JournalApp";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <JournalApp />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
