import React from 'react';
import LoginSuccess from './LoginSuccess';
import { shallow } from 'enzyme';

test('renders successfully', () => {
  shallow(
    <LoginSuccess />
  );
});
