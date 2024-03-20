import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNull } from 'lodash';
import { RootState } from '@/src/redux/store';
import { Auth } from '@/types/queries';


const initialState: Auth = {
  token: null,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<Auth>) => action.payload,
    resetAuthentication: (state, action: PayloadAction<void>) => initialState,
  },
});

export const { setAuthentication, resetAuthentication } = authSlice.actions;
export const isAuthenticated = (state: RootState) =>
  state.auth.token !== null;

