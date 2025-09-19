// helpers/cartHelpers.js

export const updateOrderQuantity = (orders, ID, color, action) => {
  return orders.map(order =>
    order.ProductID === ID && order.ProductColor === color
      ? {
          ...order,
          OrderQuantity: order.OrderQuantity + (action === 0 ? -1 : 1),
          Subtotal: (order.OrderQuantity + (action === 0 ? -1 : 1)) * order.ProductPrice
        }
      : order
  );
};

export const removeOrder = (orders, ID, color) => {
  return orders.filter(order => !(order.ProductID === ID && order.ProductColor === color));
};
