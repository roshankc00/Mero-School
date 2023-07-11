import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Signin/authSlice";
import cartReducer from '../pages/Cart/cartslice'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
  
export const persistor = persistStore(store);

