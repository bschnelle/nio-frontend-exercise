import React, { Component, PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

class LiveBarChart extends Component {

  static propTypes = {
    config: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.chart = this.refs.chart.getChart();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.xAxis[0].setCategories(nextProps.config.xAxis.categories);
    this.chart.series[0].setData(nextProps.config.series[0].data);
    // necessary????
    this.chart.reflow();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <ReactHighcharts config={this.props.config} ref="chart" />;
  }
}

export default LiveBarChart;
