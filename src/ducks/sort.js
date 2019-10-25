export const SET_SORT_TERM = 'sort/SET_SORT_TERM';
export const REMOVE_SORT_TERM = 'sort/REMOVE_SORT_TERM';
export const ASC = 'sort/ASC';
export const DESC = 'sort/DESC';

export function setSortTerm(application, term, position) {
  return {
    type: SET_SORT_TERM,
    application,
    term,
    position
  };
}

export function removeSortTerm(application, field) {
  return {
    type: REMOVE_SORT_TERM,
    application,
    field
  };
}

export const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, application, term, position, field } = action;
  switch (type) {
    case SET_SORT_TERM: {
      const newApplicationSort = state[application]
        ? [...state[application]]
        : [];
      const filteredApplication = newApplicationSort.filter(
        existing => existing.field !== term.field
      );
      filteredApplication.splice(position, 0, term);
      return { ...state, [application]: filteredApplication };
    }
    case REMOVE_SORT_TERM: {
      const newApplicationSort = state[application].filter(
        term => term.field !== field
      );
      return { ...state, [application]: newApplicationSort };
    }
    default:
      return state;
  }
}

export const sort = ({ sort }) => sort;
