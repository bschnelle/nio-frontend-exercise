import React, { Component, PropTypes } from 'react';
import CountUp from 'react-countup';
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
      oldTotalSales: 0,
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
      this.setState({
        count: count + 1,
        currentSale,
        oldTotalSales: this.state.totalSales,
        recentSales,
        totalSales: this.state.totalSales + currentSale.amount
      });
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
    const { oldTotalSales, totalSales } = this.state;

    return (
      <div className={classes.dashboard}>
        <h1>Grocery Sales</h1>
        <div className={classes.content}>
          <SalesPanel className={classes.salesPanel} sales={this.state.recentSales} />
          <div className={classes.main}>
            <div className={classes.total}>
              <div>
                <h1>Total<br />Sales</h1>
              </div>
              <div>
                <span className={classes.total}>
                  $ <CountUp start={oldTotalSales} end={totalSales} duration={1} separator="," />
                </span>
              </div>
            </div>
            <div>Chart</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
