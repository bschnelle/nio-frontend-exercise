import React, { PropTypes } from 'react';
import SaleCard from '../SaleCard/SaleCard';

/**
 * panel of SaleCards
 */
const SalesPanel = (props) => (
  <div className={props.className}>
    {props.sales.map((sale) =>
      <SaleCard key={sale.id} sale={sale} />
    )}
  </div>
);

SalesPanel.propTypes = {
  className: PropTypes.string,
  sales: PropTypes.array.isRequired
};

export default SalesPanel;
