import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import queryClient from './queryClient';
import { QueryClientProvider } from 'react-query';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
