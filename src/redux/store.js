import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/authSlice';
import { transactionsReducer } from './transaction/transactionSlice';
import { userReducer } from './user/userSlice';
import { dateReducer } from './date/dateSlice';
import { periodReducer } from './date/periodSlice';
import { categoryFilterReducer } from './categoryFilter/categoryFilterSlice';
import { reportTypeReducer } from './reportType/reportTypeSlice';
import { transactionTypeReducer } from './transactionType/transactionTypeSlice';
import { changeReducer } from './change/changeSlice';

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'sid'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    transactions: transactionsReducer,
    user: userReducer,
    date: dateReducer,
    period: periodReducer,
    categoryFilter: categoryFilterReducer,
    reportType: reportTypeReducer,
    transactionType: transactionTypeReducer,
    change: changeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
