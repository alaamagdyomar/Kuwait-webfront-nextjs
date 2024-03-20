'use client';
import { useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { rootReducer } from "@/redux/slices/rootReducer";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import rootSaga from "@/redux/sagas/rootSaga";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "@/redux/api";
import { categoryApi } from "@/redux/api/categoryApi";
import { isLocal } from "@/src/constants";
import { authApi } from "@/redux/api/authApi";
import { areaApi } from "@/redux/api/areaApi";
import { countryApi } from "@/redux/api/countryApi";
import { productApi } from "@/redux/api/productApi";
import { vendorApi } from "@/redux/api/vendorApi";


const persistConfig = {
  key: "root",
  storage,
  blacklist: ['appSetting'],
  // whitelist: [
  // ],
  // stateReconciler: hardSet,
  debug: isLocal,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const appLogger = createLogger({
  collapsed: isLocal,
  duration: isLocal,
  diff: isLocal,
});
let store: any = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: isLocal
    ? (gDM) =>
      gDM({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
          ignoredPaths: [],
        },
      }).concat([
        apiSlice.middleware,
        categoryApi.middleware,
        authApi.middleware,
        productApi.middleware,
        vendorApi.middleware,
        areaApi.middleware,
        countryApi.middleware,
        sagaMiddleware,
        appLogger,
      ])
    : (gDM) =>
      gDM({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,

          ],
          ignoredPaths: [],
        },
      }).concat([
        apiSlice.middleware,
        categoryApi.middleware,
        authApi.middleware,
        productApi.middleware,
        vendorApi.middleware,
        areaApi.middleware,
        countryApi.middleware,
        sagaMiddleware,
      ]),
});
sagaMiddleware.run(rootSaga);
export const initializeStore = (preloadedState: RootState) => {
  let _store: any = store;
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = {
      ...store.getState(),
      ...preloadedState,
    };
    // Reset the current store
    store = undefined;
  }
  // if (typeof window === "undefined") return _store;
  if (!store) store = _store;
  return _store;
};
setupListeners(store.dispatch);
const makeStore = () => store;
const persistor = persistStore(store);
// export const wrapper = createWrapper<AppStore>(makeStore, { debug: isLocal });
export const useStore = (initialState: RootState) =>
  useMemo(() => initializeStore(initialState), [initialState]);
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
