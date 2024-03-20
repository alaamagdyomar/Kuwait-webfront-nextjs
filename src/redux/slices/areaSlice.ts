import { Area, Country } from '@/types/queries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = Area;
const initialState: Props = {
  id: 0,
  name: '',
  name_en: '',
  web_name: {
    ar: '',
    en: ''
  },
  country: {
    id: 0,
  }
};

export const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setArea: (
      state: typeof initialState,
      action: PayloadAction<Props>
    ) => action.payload,
    resetArea: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => initialState,
  }
});

export const {
  setArea,
  resetArea
} = areaSlice.actions;
