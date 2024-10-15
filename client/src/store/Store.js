import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import signupReducer from '../features/SignUpSlice';
import loginReducer from "../features/LoginSlice";
import AdminReducer from "../features/AdminSlice";

// Combine the reducers
const rootReducer = combineReducers({
  FromStoreSignUp: signupReducer,
  FromStoreLogin: loginReducer,
  FromStoreAdmin: AdminReducer,
});

// Persist configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
