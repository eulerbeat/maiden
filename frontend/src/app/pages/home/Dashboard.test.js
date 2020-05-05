import React from 'react';
import Dashboard from './Dashboard';
import { shallow } from 'enzyme';

test('renders successfully', () => {
  shallow(
    <Dashboard />
  );
});
