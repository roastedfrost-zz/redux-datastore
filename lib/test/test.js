// jshint esversion: 6
/* global describe, it, before, after, expect */

import { createStore, combineReducers } from 'redux';
import { createDataStoreReducer, dispatch2datastore } from '../index';

const store = createStore(
    combineReducers({
        users: createDataStoreReducer({}, 'user'),
        posts: createDataStoreReducer({
            LOAD_POSTS_FULFILLED(state, action) {
                return { ...state, data: action.payload };
            }
        }, 'post')
    })
);

const sampleDataUsers = [
    { id: 1, user: 'Alpha', age: 24 },
    { id: 2, user: 'Beta', age: 29 },
    { id: 3, user: 'Gamma', age: 22 }
];
const sampleDataPosts = [
    { id: 1, user_id: 2, data: 'Message 1' },
    { id: 2, user_id: 2, data: 'Message 2' },
    { id: 3, user_id: 3, data: 'Message 3' }
];



describe('DataStore', () => {

    it('setData', () => {
        const data = sampleDataUsers;
        store.dispatch({
            ...store.getState().users.action.setData,
            data
        });

        const result = store.getState().users.data;
        expect(result).to.be.eql(sampleDataUsers);
    });

    it('setFilter', () => {
        const filter = { age: 22 };
        store.dispatch({
            ...store.getState().users.action.setFilter,
            filter
        });

        const result = store.getState().users.filter;
        expect(result).to.be.eql(filter);
    });

    it('setSorting', () => {
        const sorting = [{ user: 'ASC' }, { age: 'DESC' }];
        store.dispatch({
            ...store.getState().users.action.setSorting,
            sorting
        });

        const result = store.getState().users.sorting;
        expect(result).to.be.eql(sorting);
    });

    it('setPagination', () => {
        const pagination = { pageSize: 1, page: 1 };
        store.dispatch({
            ...store.getState().users.action.setPagination,
            pagination
        });

        const result = store.getState().users.pagination;
        expect(result).to.be.eql(pagination);
    });

    it('custom case-reducer', () => {
        store.dispatch({ type: 'LOAD_POSTS_FULFILLED', payload: sampleDataPosts });
        const result = store.getState().posts.data;
        expect(result).to.be.eql(sampleDataPosts);
    });

});
