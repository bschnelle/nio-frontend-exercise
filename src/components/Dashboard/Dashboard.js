import React, { Component, PropTypes } from 'react';
import CountUp from 'react-countup';
import * as nio from 'niojs';
import LiveBarChart from '../LiveBarChart/LiveBarChart';
import SalesPanel from '../SalesPanel/SalesPanel';
import classes from './Dashboard.scss';

class Dashboard extends Component {

  static propTypes = {
    stream: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      count: 0,
      currentSale: null,
      oldTotalSales: 0,
      recentSales: [],
      totalSales: 0
    };
    ['calculateChartData', 'calculateRecentSales'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  componentDidMount() {
    this.props.stream.pipe(nio.pass(sale => {
      const { count } = this.state;
      const currentSale = Object.assign({}, sale);
      currentSale.id = count;
      const chartData = this.calculateChartData(currentSale);
      const recentSales = this.calculateRecentSales(currentSale);
      this.setState({
        chartData,
        count: count + 1,
        currentSale,
        oldTotalSales: this.state.totalSales,
        recentSales,
        totalSales: this.state.totalSales + currentSale.amount
      });
    }));
  }

  calculateChartData(currentSale) {
    const chartData = Object.assign({}, this.state.chartData);
    currentSale.cart.forEach((item) => {
      const { type, quantity } = item;
      chartData[type] = chartData[type] + quantity || quantity;
    });
    return chartData;
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
    const chartConfig = {
      chart: { type: 'column' },
      series: [{ color: '#536dfe', data: [], name: 'Type' }],
      title: { text: 'Quantity Sold by Type' },
      xAxis: { categories: [] },
      yAxis: { title: { text: 'Quantity' } }
    };
    Object.keys(this.state.chartData).forEach((key) => {
      const capitalizedKey = key[0].toUpperCase() + key.slice(1);
      chartConfig.xAxis.categories.push(capitalizedKey);
      chartConfig.series[0].data.push(this.state.chartData[key]);
    });

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
            <div className={classes.chart}>
              <LiveBarChart config={chartConfig} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
