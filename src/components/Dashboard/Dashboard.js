import React, { Component, PropTypes } from 'react';
import * as nio from 'niojs';
import SalesPanel from '../SalesPanel/SalesPanel';
import classes from './Dashboard.scss';

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
    this.calculateRecentSales = this.calculateRecentSales.bind(this);
  }

  componentDidMount() {
    this.props.stream.pipe(nio.pass(sale => {
      const { count } = this.state;
      const currentSale = Object.assign({}, sale);
      currentSale.id = count;
      const recentSales = this.calculateRecentSales(currentSale);
      this.setState({ count: count + 1, currentSale, recentSales });
    }));
  }

  calculateRecentSales(currentSale) {
    const { recentSales } = this.state;
    const newRecentSales = recentSales.slice();
    if (newRecentSales.length > 10) newRecentSales.pop();
    newRecentSales.unshift(currentSale);
    return newRecentSales;
  }

  render() {
    return (
      <div className={classes.dashboard}>
        <h1>Grocery Sales</h1>
        <div className={classes.content}>
          <SalesPanel className={classes.salesPanel} sales={this.state.recentSales} />
          <div className={classes.main}>Stuff</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
