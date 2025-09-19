import React from 'react';
import '../../styles/loadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container h-96">
      <div className="spinner">
        <div className="spinner-sector spinner-sector-top"></div>
        <div className="spinner-sector spinner-sector-left"></div>
        <div className="spinner-sector spinner-sector-right"></div>
      </div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;