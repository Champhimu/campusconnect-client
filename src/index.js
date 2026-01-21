import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';
import { ToastProvider, ToastViewport } from './components/ui/toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
        <ToastViewport />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);