import { useState, useEffect } from "react";
import { useCart } from "./useCart";
import { GlobalImage } from "../helpers/Global";

export const useSummary = (orders = [] ) => {
    const { groupedOrders } = useCart(orders);
    const [total, setTotal] = useState(0);

     useEffect(() => {
        const sumTotal = orders.reduce((sum, order) => sum + order.Subtotal, 0);
        setTotal(sumTotal);
    }, [orders])

    const isDisabled = groupedOrders.some(group => {
        const totalQuantity = group.groupedOrders.reduce(
            (sum, order) => sum + order.OrderQuantity,
            0
        );

        return totalQuantity < group.groupedOrders[0].minQuantity;
    })

    /*
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
                message += `    Precio unitario: $${order.ProductPrice.toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n`;
                message += `    Subtotal: $${order.Subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n`;
                message += `    *Imagen del producto:* ${order.ProductImage ? `${GlobalImage.url}${order.ProductImage}` : "No disponible"}\n\n`;
            });

            message += `*Subtotal ${group.ProductName}:* $${subtotalGroup.toLocaleString("es-MX", {
                minimumFractionDigits: 2,
            })}\n`;
        });

        message += `\n═════════════════════\n`;
        message += `*TOTAL GENERAL:* $${total.toLocaleString("es-MX", {
            minimumFractionDigits: 2,
        })}\n`;
        message += `\n*Nota:* Los precios no incluyen IVA.\n`;

        const encodedMessage = encodeURIComponent(`${title}\n\n${greeting}${message}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };
    */

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

            message += `\n═════════════════════\n`;
            message += `*${group.ProductName}*\n`;
            message += `Cantidad total: *${totalGroupQuantity} pzs*\n\n`;

            group.groupedOrders.forEach(order => {
                message += `*Color:* ${order.ProductColor}\n`;
                message += `    Cantidad: ${order.OrderQuantity} pzs\n`;
                message += `    *Imagen del producto:* ${order.ProductImage ? `${GlobalImage.url}${order.ProductImage}` : "No disponible"}\n\n`;
            });

        });

        const encodedMessage = encodeURIComponent(`${title}\n\n${greeting}${message}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return {
        isDisabled,
        sendOrder,
        total
    }
 
}
