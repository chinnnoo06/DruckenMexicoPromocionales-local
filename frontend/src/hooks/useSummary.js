import { useState, useEffect } from "react";
import { useCart } from "./useCart";
import { GlobalImage } from "../helpers/Global";

export const useSummary = (orders = []) => {
    const { groupedOrders } = useCart(orders);
    const [total, setTotal] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showLeyend, setShowLeyend] = useState(false);

    useEffect(() => {
        let hasAgendas = false;
        let hasOthers = false;

        orders.forEach(order => {
            if (order.ProductCategory === "Agendas") hasAgendas = true;
            else hasOthers = true;
        });

        setShowPrice(hasAgendas);          // mostramos precio solo si hay agendas
        setShowLeyend(hasOthers);          // mostramos leyenda si hay otros productos
    }, [orders]);

    useEffect(() => {
        const sumTotal = orders
            .filter(order => order.ProductCategory === "Agendas") // solo agendas suman precio
            .reduce((sum, order) => sum + order.Subtotal, 0);

        setTotal(sumTotal);
    }, [orders]);

    const isDisabled = groupedOrders.some(group => {
        const totalQuantity = group.groupedOrders.reduce(
            (sum, order) => sum + order.OrderQuantity,
            0
        );
        return totalQuantity < group.groupedOrders[0].minQuantity;
    });

    const sendOrder = () => {
        const phoneNumber = "3315876207";
        const title = `*COTIZACIÓN DE PEDIDO – DRUCKEN MÉXICO PROMOCIONALES*`;
        const greeting = `Hola, visité el sitio web de *Drucken México Promocionales* y me interesan los siguientes productos:\n`;

        let message = "";

        groupedOrders.forEach(group => {
            const totalGroupQuantity = group.groupedOrders.reduce(
                (sum, order) => sum + order.OrderQuantity,
                0
            );

            const subtotalGroup = group.groupedOrders.reduce(
                (sum, order) => sum + order.Subtotal,
                0
            );

            message += `\n═════════════════════\n`;
            message += `*${group.ProductName}*\n`;
            message += `Cantidad total: *${totalGroupQuantity} pzs*\n\n`;

            group.groupedOrders.forEach(order => {
                message += `*Color:* ${order.ProductColor}\n`;
                message += `    Cantidad: ${order.OrderQuantity} pzs\n`;
                
                if (order.ProductCategory === "Agendas") {
                    message += `    Precio unitario: $${order.ProductPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n`;
                    message += `    Subtotal: $${order.Subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n`;
                } else {
                    message += `    Precio unitario: no especificado\n`;
                    message += `    Subtotal: no especificado\n`;
                }

                message += `    *Imagen del producto:* ${order.ProductImage ? `${GlobalImage.url}${order.ProductImage}` : "No disponible"}\n\n`;
            });

            if (group.groupedOrders[0].ProductCategory === "Agendas") {
                message += `*Subtotal ${group.ProductName}:* $${subtotalGroup.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                })}\n`;
            } else {
                message += `*Subtotal ${group.ProductName}:* no especificado\n`;
            }
        });

        message += `\n═════════════════════\n`;
        message += `*TOTAL GENERAL:* $${total.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
        })}\n`;

        if (showLeyend) {
            message += `* Hay productos que no tienen precio especificado\n`;
        }

        message += `\n*Nota:* Los precios no incluyen IVA.\n`;

        const encodedMessage = encodeURIComponent(`${title}\n\n${greeting}${message}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return {
        isDisabled,
        sendOrder,
        total,
        showPrice,
        showLeyend
    };
};
