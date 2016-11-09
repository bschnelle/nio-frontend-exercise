import React, { PropTypes } from 'react';
import SaleCard from '../SaleCard/SaleCard';

const SalesPanel = (props) => (
  <div>
    {props.sales.map((sale) =>
      <SaleCard key={sale.id} sale={sale} />
    )}
  </div>
);

SalesPanel.propTypes = {
  sales: PropTypes.array.isRequired
};

export default SalesPanel;
