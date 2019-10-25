import request from '../util/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toObject, toArray } from '../util/reshape';
import { createSelector } from 'reselect';
import { search } from './search';
import { DESC, sort } from './sort';

export const REQUEST_UPDATE_PLAYER = 'players/REQUEST_UPDATE_PLAYER';
export const UPDATE_PLAYER = 'players/UPDATE_PLAYER';
export const REQUEST_PLAYERS = 'players/REQUEST_PLAYERS';
export const REQUEST_SUCCEEDED = 'players/REQUEST_SUCCEEDED';
export const REQUEST_FAILED = 'players/REQUEST_FAILED';

export function requestFailed(requestType, resourceType, response, details) {
  return {
    type: REQUEST_FAILED,
    requestType,
    resourceType,
    response,
    details
  };
}

export function requestSucceeded(requestType, resourceType, response, details) {
  return {
    type: REQUEST_SUCCEEDED,
    requestType,
    resourceType,
    response,
    details
  };
}

export function requestUpdatePlayer(updatedPlayer, onSuccess) {
  return {
    type: REQUEST_UPDATE_PLAYER,
    updatedPlayer,
    onSuccess
  };
}

export function requestPlayers() {
  return {
    type: REQUEST_PLAYERS
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, requestType, resourceType, response } = action;
  switch (type) {
    case REQUEST_SUCCEEDED:
      if (requestType === REQUEST_PLAYERS) {
        return resourceType === 'PLAYERS' ? toObject(response, 'id') : state;
      }
      if (requestType === UPDATE_PLAYER) {
        return { ...state, [response.id]: response };
      }
      break;
    default:
      return state;
  }
}

export function* updatePlayerSaga() {
  yield takeEvery(REQUEST_UPDATE_PLAYER, updatePlayer);
  yield takeEvery(REQUEST_PLAYERS, requestAllPlayers);
}

export function* requestAllPlayers({ type }) {
  try {
    const response = yield call(
      request,
      'https://cooze8lmsj.execute-api.us-east-1.amazonaws.com/dev/player'
    );
    yield put(requestSucceeded(type, 'PLAYERS', response));
  } catch (e) {
    console.error(e);
    yield put(requestFailed(type, 'PLAYERS', e));
  }
}

export function* updatePlayer({ updatedPlayer, onSuccess }) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPlayer)
    };
    const BASE_URL = `https://cooze8lmsj.execute-api.us-east-1.amazonaws.com/dev/player/${updatedPlayer.id}`;
    const response = yield call(request, BASE_URL, options);
    yield put(requestSucceeded(UPDATE_PLAYER, 'PLAYERS', response, null));
    if (onSuccess) {
      onSuccess([response]);
    }
  } catch (e) {
    console.error(e);
    yield put(requestFailed(UPDATE_PLAYER, 'PLAYERS', e, null));
  }
}

export const sagas = [updatePlayerSaga];

export const players = ({ players }) => players;

export const memoizedPlayers = createSelector(
  [players],
  playersState => {
    if (!toArray(playersState).length) {
      return {};
    }
    return toObject(
      toArray(playersState).map(player => ({
        ...player
      })),
      'id'
    );
  }
);

export const playerManagerSort = createSelector(
  [sort],
  sortState => {
    return sortState.transition_manager ? sortState.transition_manager : [];
  }
);

export const sortedPlayers = createSelector(
  [memoizedPlayers, playerManagerSort],
  (memoizedPlayersState, sortState) => {
    let sortedValues = toArray(memoizedPlayersState);
    sortState
      .slice()
      .reverse()
      .forEach(
        sortTerm =>
          (sortedValues = sortedValues.sort((a, b) => {
            const aVal =
              typeof a[sortTerm.field] === 'string'
                ? a[sortTerm.field].trim()
                : a[sortTerm.field];
            const bVal =
              typeof b[sortTerm.field] === 'string'
                ? b[sortTerm.field].trim()
                : b[sortTerm.field];
            if (sortTerm.order === DESC) {
              return typeof aVal === 'string'
                ? bVal.localeCompare(aVal)
                : bVal - aVal;
            }
            return typeof aVal === 'string'
              ? aVal.localeCompare(bVal)
              : aVal - bVal;
          }))
      );

    return sortedValues;
  }
);

export const playerManagerSearch = createSelector(
  [search],
  searchState => {
    return searchState.transition_manager ? searchState.transition_manager : {};
  }
);

export const filteredPlayers = createSelector(
  [sortedPlayers, playerManagerSearch],
  (sortedPlayersState, playerManagerSearchState) => {
    return sortedPlayersState.filter(player => {
      return toArray(playerManagerSearchState).every(term => {
        if (!term.hasOwnProperty('field')) {
          return term.values.some(value =>
            Object.keys(player).some(key =>
              player[key]
                ? player[key]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase())
                : false
            )
          );
        } else {
          return term.values.includes(player[term.field]);
        }
      });
    });
  }
);

export const getPills = createSelector(
  [playerManagerSearch],
  playerManagerSearchState => {
    return toArray(playerManagerSearchState).map(term => {
      let pillName;
      switch (term.field) {
        default:
          pillName = term.values.join();
      }
      return {
        ...term,
        name: pillName
      };
    });
  }
);
