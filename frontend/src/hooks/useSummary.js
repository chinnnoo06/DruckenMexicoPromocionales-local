import { useCart } from "./useCart";
import { GlobalImage } from "../helpers/Global";

export const useSummary = (orders = []) => {
    const { groupedOrders } = useCart(orders);

    const isDisabled = groupedOrders.some(group => {
        const totalQuantity = group.groupedOrders.reduce(
            (sum, order) => sum + order.OrderQuantity,
            0
        );
        return totalQuantity < group.groupedOrders[0].minQuantity;
    });

    const sendOrder = () => {
        const phoneNumber = "3315876207";
        const title = `*COTIZACIÓN DE PEDIDO - DRUCKEN MÉXICO PROMOCIONALES*`;
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
                message += `    *Imagen del producto:* ${
                    order.ProductImage
                        ? `${GlobalImage.url}${order.ProductImage}`
                        : "No disponible"
                }\n\n`;
            });
        });

        message += `\n═════════════════════\n`;

        // 🔹 Notas finales
        message += `\n*Nota:* Cantidades sujetas a confirmación.\n`;
        message += `*Nota:* Los precios se proporcionarán en la cotización directamente por mensaje.\n`;

        const encodedMessage = encodeURIComponent(`${title}\n\n${greeting}${message}`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    };

    return {
        isDisabled,
        sendOrder
    };
};