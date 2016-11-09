import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as nio from 'niojs';
import sinon from 'sinon';
import Dashboard from './Dashboard';
import SalesPanel from '../SalesPanel/SalesPanel';

describe('Dashboard', () => {
  let stream;
  let wrapper;

  beforeEach(() => {
    sinon.stub(nio, 'pass');
    stream = { pipe: sinon.stub() };
    wrapper = shallow(<Dashboard stream={stream} />);
  });

  afterEach(() => {
    nio.pass.restore();
  });

  it('renders an h1 with "Grocery Sales"', () => {
    expect(wrapper.contains(<h1>Grocery Sales</h1>)).to.be.true;
  });

  it('renders a SalesPanel', () => {
    expect(wrapper.find(SalesPanel)).to.have.length(1);
  });
});
