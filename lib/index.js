// jshint esversion: 6

import { createReducer } from './utils';


// action types
const TYPE_SET_DATA       = 'DATASTORE_SET_DATA';
const TYPE_SET_FILTER     = 'DATASTORE_SET_FILTER';
const TYPE_SET_SORTING    = 'DATASTORE_SET_SORTING';
const TYPE_SET_PAGINATION = 'DATASTORE_SET_PAGINATION';


function createDataStoreReducer(caseReducers, storeName) {
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
                return { ...state, data: action.data, pagination: null };
            }
            return state;
        },
        [ TYPE_SET_FILTER ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, filter: action.filter, pagination: null };
            }
            return state;
        },
        [ TYPE_SET_SORTING ](state, action) {
            if (action.storeName === state.storeName) {
                return { ...state, sorting: action.sorting, pagination: null };
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

function dispatch2datastore(dispatch) {
    return {
        storeSetData(store) {
            return data => dispatch({ ...store.action.setData, data });
        },
        storeFilter(store) {
            return filter => dispatch({ ...store.action.setFilter, filter });
        },
        storeSort(store) {
            return sorting => dispatch({ ...store.action.setSorting, sorting });
        },
        storePaginate(store) {
            return pagination => dispatch({ ...store.action.setPagination, pagination });
        }
    };
}

export { createDataStoreReducer, dispatch2datastore };
