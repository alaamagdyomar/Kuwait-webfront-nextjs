import { fork, take, all, throttle } from 'redux-saga/effects';
import { REHYDRATE, PURGE } from 'redux-persist/lib/constants';
import {
  triggerChangeLang,
  triggerEnableLoading,
  triggerShowToastMessage,
  // triggerResetEntireApp,
  // triggerSetAuthScenario,

} from './triggers';

export default function* rootSaga() {
  yield all([
    fork(triggerEnableLoading),
    fork(triggerShowToastMessage),
    fork(triggerChangeLang),
    // fork(triggerResetEntireApp),

  ]);
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield take(PURGE);
}
