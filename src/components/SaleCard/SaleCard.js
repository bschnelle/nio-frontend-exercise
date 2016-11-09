import React, { PropTypes } from 'react';
import classes from './SaleCard.scss';

const SaleCard = (props) => {
  const { amount, cart, shopper: { name } } = props.sale;

  return (
    <div className={classes.saleCard}>
      <h4>{name} spent ${amount}</h4>
      <ul>
        {
          cart.map((item, index) => {
            const { name: itemName, quantity } = item;
            return <li key={index}>{quantity} {itemName}</li>;
          })
        }
      </ul>
    </div>
  );
};

SaleCard.propTypes = {
  sale: PropTypes.object.isRequired
};

export default SaleCard;
