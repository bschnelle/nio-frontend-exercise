import React, { PropTypes } from 'react';

const SaleCard = (props) => {
  const { name } = props.sale.shopper;

  return (
    <div>
      <h5>{name}</h5>
    </div>
  );
};

SaleCard.propTypes = {
  sale: PropTypes.object.isRequired
};

export default SaleCard;
