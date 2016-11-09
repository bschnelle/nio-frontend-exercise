import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SalesPanel from './SalesPanel';

describe('SalesPanel', () => {
  const sales = [{
    id: 1,
    shopper: {
      name: 'John Smith'
    }
  }];
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SalesPanel sales={sales} />);
  });

  it('renders', () => {
    expect(wrapper).to.be.truthy;
  });
});
