import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders an h2 with "Hello from Dashboard!"', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.contains(<h2>Hello from Dashboard!</h2>)).to.be.true;
  });
});
