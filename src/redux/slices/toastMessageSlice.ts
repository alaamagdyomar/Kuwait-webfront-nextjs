import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastMessage } from '@/types/index';

const initialState: toastMessage = {
  title: ``,
  content: ``,
  showToast: false,
  type: `default`,
};

export const toastMessageSlice = createSlice({
  name: 'toastMessage',
  initialState,
  reducers: {
    showToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        type: string;
        title?: string;
      }>,
    ) => ({
      content: action.payload.content,
      showToast: true,
      type: action.payload.type,
      title: action.payload.title ?? ``,
    }),
    showSuccessToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        title?: string;
      }>,
    ) => ({
      content: action.payload.content,
      showToast: true,
      type: 'success',
      title: action.payload.title ?? ``,
    }),
    showErrorToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        title?: string;
      }>,
    ) => ({
      content: action.payload.content,
      showToast: true,
      type: 'error',
      title: action.payload.title ?? ``,
    }),
    showWarningToastMessage: (
      state: typeof initialState,
      action: PayloadAction<{
        content: string;
        title?: string;
      }>,
    ) => ({
      content: action.payload.content,
      showToast: true,
      type: 'warning',
      title: action.payload.title ?? ``,
    }),
    hideToastMessage: (
      state: typeof initialState,
      action: PayloadAction<void | undefined>,
    ) => {
      return {
        title: ``,
        content: ``,
        type: 'info',
        showToast: false,
      };
    },
  },
});

export const {
  showToastMessage,
  showSuccessToastMessage,
  showErrorToastMessage,
  showWarningToastMessage,
  hideToastMessage,
} = toastMessageSlice.actions;
