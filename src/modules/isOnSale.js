const isOnSale = (price, salePrice) => {
  return parseFloat(salePrice) !== 0 ? salePrice : price
};

export default isOnSale;
