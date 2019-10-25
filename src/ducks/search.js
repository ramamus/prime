export const SET_SEARCH_TERMS = 'search/SET_SEARCH_TERMS';
export const REMOVE_SEARCH_TERM = 'search/REMOVE_SEARCH_TERM';

export function setSearchTerms(application, searchTerm) {
  return {
    type: SET_SEARCH_TERMS,
    application,
    searchTerm
  };
}

export function removeSearchTerm(application, id) {
  return {
    type: REMOVE_SEARCH_TERM,
    application,
    id
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, application, searchTerm, id } = action;
  switch (type) {
    case SET_SEARCH_TERMS: {
      let newApplicationSearchState;
      const maxIndex =
        state[application] && Object.keys(state[application]).length > 0
          ? Math.max.apply(Math, Object.keys(state[application]))
          : 0;
      const isIdPresent = searchTerm.hasOwnProperty('id');
      if (!isIdPresent) {
        newApplicationSearchState = {
          ...state[application],
          [maxIndex + 1]: {
            id: maxIndex + 1,
            ...searchTerm
          }
        };
      } else {
        newApplicationSearchState = {
          ...state[application],
          [searchTerm.id]: searchTerm
        };
      }

      return { ...state, [application]: newApplicationSearchState };
    }
    case REMOVE_SEARCH_TERM: {
      const newApplicationState = { ...state[application] };
      delete newApplicationState[id];
      return { ...state, [application]: newApplicationState };
    }
    default:
      return state;
  }
}

export const search = ({ search }) => search;
