// jshint esversion: 6

import { createReducer } from './utils';


// action types
const TYPE_SET_DATA       = 'DATASTORE_SET_DATA';
const TYPE_SET_FILTER     = 'DATASTORE_SET_FILTER';
const TYPE_SET_SORTING    = 'DATASTORE_SET_SORTING';
const TYPE_SET_PAGINATION = 'DATASTORE_SET_PAGINATION';


function createStoreReducer(caseReducers, storeName) {
    const initialState = {
        storeName,
        action: {
            setData       : { storeName, type: TYPE_SET_DATA },
            setFilter     : { storeName, type: TYPE_SET_FILTER },
            setSorting    : { storeName, type: TYPE_SET_SORTING },
            setPagination : { storeName, type: TYPE_SET_PAGINATION }
        },
        data: []
    };

    return createReducer(initialState, {
        [ TYPE_SET_DATA ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, data: action.data };
            }
            return state;
        },
        [ TYPE_SET_FILTER ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, filter: action.filter };
            }
            return state;
        },
        [ TYPE_SET_SORTING ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, sorting: action.sorting };
            }
            return state;
        },
        [ TYPE_SET_PAGINATION ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, pagination: action.pagination };
            }
            return state;
        },
        ...(caseReducers || {})
    });
}

export { createStoreReducer };
