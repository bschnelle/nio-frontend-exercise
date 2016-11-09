import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SaleCard from './SaleCard';
import classes from './SaleCard.scss';

describe('SaleCard', () => {
  let sale;
  let wrapper;

  beforeEach(() => {
    sale = {
      id: '1',
      cart: [
        { name: 'apple', quantity: 10 },
        { name: 'orange', quantity: 5 }
      ],
      shopper: { name: 'John Wick' }
    };
    wrapper = shallow(<SaleCard sale={sale} />);
  });

  it('renders a wrapper with a saleCard class', () => {
    expect(wrapper.find(`div.${classes.saleCard}`)).to.have.length(1);
  });
});
