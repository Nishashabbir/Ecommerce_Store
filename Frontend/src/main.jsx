import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../client/src/index.css';
import './styles.css';
import App from './App';
import { ProductsProvider } from './contexts/ProductsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </StrictMode>
);
