import {
  takeLatest,
  call,
  put,
  all,
  throttle,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import {
  startChangeLangScenario,
  startEnableLoadingScenario,
  startShowToastMessageScenario,
  startResetEnireAppSceanrio,

  startSetAuthScenario,

} from './appSaga';
import { localeSlice } from '@/redux/slices/localeSlice';
import { toastMessageSlice } from '../slices/toastMessageSlice';
import { settingSlice } from '../slices/settingSlice';

export function* triggerResetEntireApp() {
  yield takeLatest(`resetEntireApp`, startResetEnireAppSceanrio);
}


export function* triggerEnableLoading() {
  yield takeLatest(
    `${settingSlice.actions.enableLoading}`,
    startEnableLoadingScenario
  );
}

export function* triggerChangeLang() {
  yield takeLatest(`${localeSlice.actions.setLocale}`, startChangeLangScenario);
}


export function* triggerSetAuthScenario() {
  yield takeLatest(
    [
      // `${authSlice.actions.setAuth}`,
      // `${authSlice.actions.resetAuth}`,
    ], startSetAuthScenario);
}
export function* triggerShowToastMessage() {
  yield takeLatest(
    [
      `${toastMessageSlice.actions.showToastMessage}`,
      `${toastMessageSlice.actions.showSuccessToastMessage}`,
      `${toastMessageSlice.actions.showErrorToastMessage}`,
      `${toastMessageSlice.actions.showWarningToastMessage}`,
    ],
    startShowToastMessageScenario,
  );
}
