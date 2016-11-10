import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SaleCard from '../SaleCard/SaleCard';
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

  it('renders SaleCards', () => {
    expect(wrapper.find(SaleCard)).to.have.length(1);
  });
});
