import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactHighcharts from 'react-highcharts';
import LiveBarChart from './LiveBarChart';
// import classes from './LiveBarChart.scss';

describe('LiveBarChart', () => {
  let data;
  let wrapper;

  beforeEach(() => {
    data = {
      id: '1',
      cart: [
        { name: 'apple', quantity: 10 },
        { name: 'orange', quantity: 5 }
      ],
      shopper: { name: 'John Wick' }
    };
    wrapper = shallow(<LiveBarChart data={data} />);
  });

  it('renders a ReactHighcharts component', () => {
    expect(wrapper.find(ReactHighcharts)).to.have.length(1);
  });
});
