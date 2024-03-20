import { Branch } from '@/types/queries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Props = Branch;
const initialState: Props = {
  id: 0,
  name: '',
  longitude: 0,
  latitude: 0,
  address: '',
  phone: '',
  delivery_type: 'pickup',
  vendor_id: '',
  modalEnabled: false
};

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setBranch: (
      state: typeof initialState,
      action: PayloadAction<Props>
    ) => {
      return {
        modalEnabled: state.modalEnabled,
        ...action.payload
      }
    },
    resetBranch: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => initialState,
    showBranchModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        modalEnabled: true
      }
    },
    hideBranchModal: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        modalEnabled: false
      }
    },
  }
});

export const {
  setBranch,
  resetBranch,
  showBranchModal,
  hideBranchModal,
} = branchSlice.actions;
