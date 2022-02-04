import React from 'react';
import ReactDOM from 'react-dom';
import { CartContextProvider } from './store/CartContext';

import './index.css';
import App from './App';

ReactDOM.render(
    <CartContextProvider>
        <App />
    </CartContextProvider>,
    document.getElementById('root')
);
