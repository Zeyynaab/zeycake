// src/components/PageBanner.js
import React from 'react';
import '../style/global.css';

const PageBanner = ({ image, titre, sousTitre }) => {
  return (
    <div className="page-banner" style={{ backgroundImage: `url(${image})` }}>
      <div className="banner-overlay">
        <div className="banner-content">
          <h1 className="banner-title">{titre}</h1>
          {sousTitre && <p className="banner-subtitle">{sousTitre}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
