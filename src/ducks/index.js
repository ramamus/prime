/**
 *  Register your ducks here. For each duck:
 *      - import the reducer and sagas array
 *      - add the reducer to the default export
 *      - add the sagas array to allSagas using spread operator
 */

import { all, fork } from 'redux-saga/effects';
import sort from './sort';
import players, { sagas as playerSagas } from './players';
import search from './search';

export default {
  players,
  search,
  sort
};

const allSagas = [...playerSagas];

export function* rootSaga() {
  yield all(allSagas.map(saga => fork(saga)));
}
