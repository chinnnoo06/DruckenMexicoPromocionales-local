// hooks/useSave.js
import { useState, useCallback } from "react";

export const useProduct = (product, selectedColor) => {
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(value);
  };

  const saveProductLocalStorage = useCallback(() => {
    let alreadyExist = false;

    const newOrder = {
      ProductID: product._id,
      ProductKey: product.key,
      ProductName: product.name,
      ProductPrice: product.price,
      ProductColor: product.colors[selectedColor].color,
      ProductHexColor: product.colors[selectedColor].hex,
      ProductImage: product.colors[selectedColor].image,
      OrderQuantity: quantity,
      Subtotal: product.price * quantity,
      minQuantity: product.minQuantity,
    };

    const existingOrders = JSON.parse(localStorage.getItem("order")) || [];

    for (let i = 0; i < existingOrders.length; i++) {
      if (
        existingOrders[i].ProductID === newOrder.ProductID &&
        existingOrders[i].ProductColor === newOrder.ProductColor
      ) {
        existingOrders[i].OrderQuantity += newOrder.OrderQuantity;
        existingOrders[i].Subtotal =
          existingOrders[i].ProductPrice *
          existingOrders[i].OrderQuantity;
        alreadyExist = true;
        break;
      }
    }

    if (!alreadyExist) {
      existingOrders.push(newOrder);
    }

    localStorage.setItem("order", JSON.stringify(existingOrders));

    setOrder(newOrder);
    setShowModal(true);
  }, [product, selectedColor, quantity]);

  return {
    quantity,
    order,
    showModal,
    setShowModal,
    handleQuantityChange,
    saveProductLocalStorage,
  };
};
