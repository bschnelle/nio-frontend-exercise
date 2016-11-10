import React, { Component, PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

/**
 * realtime bar chart displaying quantities sold by type
 */
class LiveBarChart extends Component {

  static propTypes = {
    config: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.chart = this.refs.chart.getChart();
  }

  /**
   * update chart via HC API to prevent full rerender
   */
  componentWillReceiveProps(nextProps) {
    this.chart.xAxis[0].setCategories(nextProps.config.xAxis.categories);
    this.chart.series[0].setData(nextProps.config.series[0].data);
    this.chart.reflow();
  }


  /**
   * as noted above
   */
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <ReactHighcharts config={this.props.config} ref="chart" />;
  }
}

export default LiveBarChart;
