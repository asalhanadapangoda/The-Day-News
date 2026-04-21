import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.jsx';
import './index.css';

// Create a client with performance-optimized cache settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes — reduces redundant API calls
      gcTime: 1000 * 60 * 60,    // 60 minutes — keep data in memory longer
      refetchOnWindowFocus: false,
      refetchOnMount: false,     // Don't re-fetch if data is fresh
      retry: 1,                  // Only retry once on failure (reduces TBT on bad networks)
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
