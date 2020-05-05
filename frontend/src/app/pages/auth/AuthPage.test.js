import React from 'react';
import AuthPage from './AuthPage';
import { shallow } from 'enzyme';

test('renders successfully', () => {
  shallow(
    <AuthPage />
  );
});
