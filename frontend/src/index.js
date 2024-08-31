import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';  // Import RecoilRoot
import App from './App';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot> {/* Wrap your app with RecoilRoot */}
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </RecoilRoot>
);
