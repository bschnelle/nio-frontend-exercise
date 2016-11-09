import React, { Component, PropTypes } from 'react';
import nio from 'niojs';

class Dashboard extends Component {

  static propTypes = {
    stream: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      currentSale: null,
      totalSales: 0
    };
  }

  componentDidMount() {
    this.props.stream.pipe(nio.pass(currentSale => this.setState({ currentSale })));
  }

  render() {
    return (
      <div>
        <h2>Hello from Dashboard!</h2>
        {JSON.stringify(this.state.currentSale)}
      </div>
    );
  }
}

export default Dashboard;
