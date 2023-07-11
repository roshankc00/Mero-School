import { Provider } from 'react-redux';
import { persistor, store } from './store/index.tsx';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react'
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryHandler from './pages/ErrorBoundry/index.tsx';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorBoundaryHandler/>}>

    <Provider store={store}>      
    <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
   
    <App />
    </GoogleOAuthProvider>
    </BrowserRouter>
    </PersistGate>
    </Provider>

    </ErrorBoundary>
  </React.StrictMode>
)
