"use client"

import { useEffect } from 'react';

const LoadingPage = () => {
  useEffect(() => {
    const loadingElem = document.getElementById('loading');
    const loadingTextElem = document.getElementById('loading-text');
    let loading = 0;

    const loadingInterval = setInterval(() => {
      loading += 10;
      loadingElem.style.width = `${loading}%`;
      loadingTextElem.innerText = `Loading... ${loading}%`;
    }, 500);

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <div className="loading-container">
      <div id="loading" className="loading-bar"></div>
      <div id="loading-text" className="loading-text"></div>
    </div>
  );
};

export default LoadingPage;
