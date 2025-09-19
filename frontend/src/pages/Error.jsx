import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4 mb-6 text-gray-700">
        Oops! La página que buscas no existe.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );
};
