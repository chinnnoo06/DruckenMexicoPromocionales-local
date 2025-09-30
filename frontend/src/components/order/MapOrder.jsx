import React, { useEffect } from 'react'
import { useCart } from '../../hooks/useCart';
import { OrderCart } from './OrderCart';
import { OrderCartBeta } from './OrderCartBerta';

export const MapOrder = ({ orders, setOrders }) => {
  const { handleAmount, deleteProduct, groupedOrders } = useCart(orders, setOrders);

  return (
    <div className="col1 flex flex-col flex-[70%] min-h-[400px]">

      <div className="space-y-2">
        {groupedOrders.map(group => {
          const totalQuantity = group.groupedOrders.reduce(
            (sum, order) => sum + order.OrderQuantity,
            0
          );

          return (
            <OrderCartBeta
              key={group.ProductID}
              group={group}
              totalQuantity={totalQuantity}
              handleAmount={handleAmount}
              deleteProduct={deleteProduct}
            />
          );
        })}


      </div>

    </div>
  )
}
