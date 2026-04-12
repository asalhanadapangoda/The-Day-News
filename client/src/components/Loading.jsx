import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0014]">
      {/* Pulse background */}
      <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
      
      <div className="relative">
        {/* Spinning Outer Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/30 border-l-transparent animate-spin"></div>
        
        {/* Core Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]"></div>
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-white font-bold tracking-[0.3em] uppercase text-xs opacity-80 animate-pulse">
          Loading
        </h2>
        <div className="mt-2 flex gap-1 justify-center">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
