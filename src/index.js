import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/userContext';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <UserProvider>
            <App />
        </UserProvider>
    );

    reportWebVitals();
} else {
    console.error("Failed to find root element to mount the React app.");
}
