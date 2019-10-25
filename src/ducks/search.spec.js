import { Reducer } from 'redux-testkit';

import searchReducer, {
  initialState,
  setSearchTerms,
  removeSearchTerm
} from './search';

describe('Search Reducer tests', () => {
  it('should set search parameters under application key without incoming id', () => {
    const action = setSearchTerms('category_manager', {
      values: ['blue']
    });
    const expectedState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        }
      }
    };
    Reducer(searchReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState(expectedState);
  });
  it('should set search parameters under application key with incoming id', () => {
    const action = setSearchTerms('category_manager', {
      id: 1,
      values: ['blue']
    });
    const expectedState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        }
      }
    };
    Reducer(searchReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState(expectedState);
  });
  it('should add search parameters under application key to existing search terms', () => {
    const initialState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        }
      }
    };
    const action = setSearchTerms('category_manager', {
      values: ['red']
    });
    const expectedState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        },
        2: {
          id: 2,
          values: ['red']
        }
      }
    };
    Reducer(searchReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState(expectedState);
  });
  it('should replace search index under application key if incoming searchTerms have same id', () => {
    const initialState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        }
      }
    };
    const action = setSearchTerms('category_manager', {
      id: 1,
      values: ['red', 'blue']
    });
    const expectedState = {
      category_manager: {
        1: {
          id: 1,
          values: ['red', 'blue']
        }
      }
    };
    Reducer(searchReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState(expectedState);
  });
  it('should delete a search term', () => {
    const initialState = {
      category_manager: {
        1: {
          id: 1,
          values: ['blue']
        },
        2: {
          id: 2,
          values: ['blue']
        }
      }
    };
    const action = removeSearchTerm('category_manager', 1);
    const expectedState = {
      category_manager: {
        2: {
          id: 2,
          values: ['blue']
        }
      }
    };
    Reducer(searchReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState(expectedState);
  });
});
