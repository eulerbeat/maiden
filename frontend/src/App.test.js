import React from 'react';
import App from './App';
import store, { persistor } from "./app/store/store";
import { shallow } from 'enzyme';

test('renders successfully', () => {
  shallow(
    <App store={store}
      persistor={persistor} />
  );
});
