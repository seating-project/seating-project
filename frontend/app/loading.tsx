"use client";

import { useEffect } from "react";

const LoadingPage = () => {
  // useEffect(() => {
  //   const loadingElem = document.getElementById("loading");
  //   const loadingTextElem = document.getElementById("loading-text");
  //   let loading = 0;

  //   const loadingInterval = setInterval(() => {
  //     loading += 10;
  //     loadingElem.style.width = `${loading}%`;
  //     loadingTextElem.innerText = `Loading... ${loading}%`;
  //   }, 500);

  //   return () => {
  //     clearInterval(loadingInterval);
  //   };
  // }, []);

  return (
    <div className="bg-white bg-opacity-40 backdrop-blur-md drop-shadow-lg flex justify-center items-center h-screen rounded-md w-screen">
      <div className="w-12 h-12 border-8 border-t-8 border-sky-blue rounded-full text-white animate-spin">
        <svg viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
};

export default LoadingPage;
