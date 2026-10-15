import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import { LoadingSequence } from './components/LoadingSequence';
import './index.css';

function PortfolioRoot() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <App />
      {isLoading && <LoadingSequence onComplete={() => setIsLoading(false)} />}
      <Analytics />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PortfolioRoot />
  </React.StrictMode>
);
