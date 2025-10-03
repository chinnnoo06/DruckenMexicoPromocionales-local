import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '../components/layout/SectionWrapper';
import { Link } from 'react-router-dom';
import { MapOrder } from '../components/order/MapOrder';
import { OrderSummary } from '../components/order/OrderSummary';


export const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
    setOrders(Array.isArray(storedOrders) ? storedOrders : [storedOrders]);
    return storedOrders;
  }

  useEffect(() => {
    getOrders();
  }, [])

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orders));
  }, [orders]);

  return (
    <SectionWrapper className='container-main-content flex flex-col pt-32 pb-20 gap-5 mx-auto max-w-[1300px]'>
      <div className="text-center">
        <h1 className='text-[#9F531B] titulo-seccion font-bold text-[48px] sm:text-[52px] md:text-[55px] lg:text-[60px] mb-6 relative inline-block'>
          Tu pedido
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-24 h-1.5 bg-[#9F531B] rounded-full"></span>
        </h1>
        <p className="text-gray-700 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium mt-2 block">
          Todo lo que has elegido está aquí, listo para ti.
        </p>
      </div>

      {orders.length >= 1 ? (
        <div className="flex flex-col gap-2 md:flex-row">

          <MapOrder orders={orders} setOrders={setOrders} />

          {/*  <OrderSummary orders={orders} />*/}
          <OrderSummary orders={orders} />

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 ">
          <div className='mb-6 p-4 bg-[#e9d4bd] rounded-full'>
            <i className="fa-solid fa-bag-shopping text-3xl sm:text-4xl md:text-5xl text-[#9F531B]"></i>
          </div>
          <h3 className="font-semibold text-[#9F531B] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] mb-2">Tu pedido está vacío</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Parece que no has agregado ningún producto a tu carrito todavía.</p>
          <Link to="/catalogo" className='no-underline'>
            <button
              className='px-3.5 py-1.5 text-sm md:px-5 md:py-2 md:text-lg rounded-xl font-semibold transition-all duration-300
                        text-[#EEEEEF] bg-[#9F531B] hover:bg-[#7C3E13]
                        shadow-lg hover:shadow-xl flex items-center justify-center gap-2'

            >
              Explorar productos
            </button>
          </Link>

        </div>
      )}

    </SectionWrapper>
  );
};
