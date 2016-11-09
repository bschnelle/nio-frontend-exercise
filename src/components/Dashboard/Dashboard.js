import React, { Component, PropTypes } from 'react';
import * as nio from 'niojs';
import SalesPanel from '../SalesPanel/SalesPanel';

class Dashboard extends Component {

  static propTypes = {
    stream: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentSale: null,
      recentSales: [],
      totalSales: 0
    };
  }

  componentDidMount() {
    this.props.stream.pipe(nio.pass(sale => {
      const { count, recentSales: oldRecentSales } = this.state;
      const currentSale = Object.assign({}, sale);
      const recentSales = oldRecentSales.slice();
      currentSale.id = count;
      recentSales[0] = currentSale;
      this.setState({ count: count + 1, currentSale, recentSales });
    }));
  }

  render() {
    return (
      <div>
        <h1>Grocery Sales</h1>
        <SalesPanel sales={this.state.recentSales} />
      </div>
    );
  }
}

export default Dashboard;
