import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Props = {
  isLoading: boolean;

  showLoginModal: boolean;
  showRegisterModal: boolean;
  showForgetPasswordModal: boolean;
  showVerificationModal: boolean;
  showChangePasswordModal: boolean;
  showCartMenu: boolean;
  sideMenuOpen: boolean;

};
const initialState: Props = {
  isLoading: false,
  sideMenuOpen: false,
  showLoginModal: false,
  showRegisterModal: false,
  showForgetPasswordModal: false,
  showVerificationModal: false,
  showChangePasswordModal: false,
  showCartMenu: false,

};

export const settingSlice = createSlice({
  name: "appSetting",
  initialState,
  reducers: {
    setCurrentPath: (
      state: typeof initialState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        currentPath: action.payload,
      };
    },
    enableLoading: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    disableLoading: (
      state: typeof initialState,
      action: PayloadAction<void>
    ) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    toggleLoginModal: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showLoginModal:
          action.payload === undefined ? !state.showLoginModal : action.payload,
      };
    },
    toggleRegisterModal: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showRegisterModal:
          action.payload === undefined
            ? !state.showRegisterModal
            : action.payload,
      };
    },
    toggleForgetPasswordModal: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showForgetPasswordModal:
          action.payload === undefined
            ? !state.showForgetPasswordModal
            : action.payload,
      };
    },
    toggleVerficationModal: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showVerificationModal:
          action.payload === undefined
            ? !state.showVerificationModal
            : action.payload,
      };
    },
    toggleChangePasswordModal: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showChangePasswordModal:
          action.payload === undefined
            ? !state.showChangePasswordModal
            : action.payload,
      };
    },
    toggleSideMenu: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        sideMenuOpen:
          action.payload === undefined ? !state.sideMenuOpen : action.payload,
      };
    },
    toggleCartMenu: (
      state: typeof initialState,
      action: PayloadAction<undefined | boolean>
    ) => {
      return {
        ...initialState,
        showCartMenu: action.payload === undefined ? !state.showCartMenu : action.payload,
      };
    },
  },
});

export const {
  setCurrentPath,
  enableLoading,
  disableLoading,
  toggleLoginModal,
  toggleRegisterModal,
  toggleForgetPasswordModal,
  toggleVerficationModal,
  toggleChangePasswordModal,
  toggleSideMenu,
  toggleCartMenu,
} = settingSlice.actions;
