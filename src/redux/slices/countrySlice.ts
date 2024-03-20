import { Area, Country } from '@/types/queries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = Country;
const initialState: Props = {
  id: 2,
  name: '',
  name_en: 'kuwait',
  country_code: 'kw',
  code: '',
  web_name: {
    ar: '',
    en: ''
  },
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (
      state: typeof initialState,
      action: PayloadAction<Props>
    ) => action.payload,
    getCountry: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => state,
    resetCountry: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => initialState,
  }
});

export const {
  getCountry,
  setCountry,
  resetCountry
} = countrySlice.actions;
