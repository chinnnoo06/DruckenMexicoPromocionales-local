import { useMemo } from "react";

export const useCart = (orders = [], setOrders) => {

  const handleAmount = (ID, color, action) => {
    setOrders(prev => updateOrderQuantity(prev, ID, color, action));
  };

  const deleteProduct = (ID, color) => {
    setOrders(prev => removeOrder(prev, ID, color));
  };

  const updateOrderQuantity = (orders, ID, color, action) => {
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

  const removeOrder = (orders, ID, color) => {
    return orders.filter(order => !(order.ProductID === ID && order.ProductColor === color));
  };


  const groupedOrders = useMemo(() => {
    return Object.values(
      orders.reduce((acc, order) => {
        if (!acc[order.ProductID]) {
          acc[order.ProductID] = {
            ProductID: order.ProductID,
            ProductKey: order.ProductKey,
            ProductName: order.ProductName,
            minQuantity: order.minQuantity,
            groupedOrders: [],
          };
        }
        acc[order.ProductID].groupedOrders.push(order);
        return acc;
      }, {})
    );
  }, [orders]);

  return { orders, setOrders, handleAmount, deleteProduct, groupedOrders };
};
