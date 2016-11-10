import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactHighcharts from 'react-highcharts';
import LiveBarChart from './LiveBarChart';

describe('LiveBarChart', () => {
  let config;
  let wrapper;

  beforeEach(() => {
    config = {};
    wrapper = shallow(<LiveBarChart config={config} />);
  });

  it('renders a ReactHighcharts component', () => {
    expect(wrapper.find(ReactHighcharts)).to.have.length(1);
  });
});
