import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './state';
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
}
  from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const perisitConfig = { key: "root", storage, version: 1 };
const perisistedReducer = persistReducer(perisitConfig, authReducer);
const store = configureStore({
  reducer: perisistedReducer,

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      }
    })
  
  
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>

        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


