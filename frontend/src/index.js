import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store, { persistor } from "./app/store/store";
import { setupAxios } from "./app/utils/utils";

setupAxios(axios, store);

ReactDOM.render(
  <React.StrictMode>
    <App
      store={store}
      persistor={persistor} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
