import { useMemo } from "react";
import { updateOrderQuantity, removeOrder } from '../helpers/CartHelpers';

export const useCart = (orders = [], setOrders) => {

  const handleAmount = (ID, color, action) => {
    setOrders(prev => updateOrderQuantity(prev, ID, color, action));
  };

  const deleteProduct = (ID, color) => {
    setOrders(prev => removeOrder(prev, ID, color));
  };

  const groupedOrders = useMemo(() => {
    return Object.values(
      orders.reduce((acc, order) => {
        if (!acc[order.ProductID]) {
          acc[order.ProductID] = {
            ProductID: order.ProductID,
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
