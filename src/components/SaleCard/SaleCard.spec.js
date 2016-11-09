import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SaleCard from './SaleCard';

describe('SaleCard', () => {
  let sale;
  let wrapper;

  beforeEach(() => {
    sale = { id: '1', shopper: { name: 'John Wick' } };
    wrapper = shallow(<SaleCard sale={sale} />);
  });

  it('renders', () => {
    expect(wrapper).to.be.truthy;
  });
});
