// jshint esversion: 6

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import { createDataStoreReducer, dispatch2datastore } from '../lib/index';
import UsersList from './userslist';
require('./style.css');


const rootReducer = combineReducers({
    usersStore: createDataStoreReducer({
        LIST_USERS_FULFILLED(state, action) {
            return { ...state, data: action.payload };
        }
    }, 'USERS')
});

const store = createStore(
    rootReducer
);


const App = connect(
    (state, ownProps) => ({
        datastore: state.usersStore
    }),
    (dispatch, ownProps) => ({
        ...dispatch2datastore(dispatch),
        loadUsers() {
            return dispatch({
                type: 'LIST_USERS_FULFILLED',
                payload:  [
                    { id: 1, name: 'George Bell'     , age: 33, gender: 'Male' },
                    { id: 2, name: 'Jerry Bryant'    , age: 27, gender: 'Male' },
                    { id: 3, name: 'Arthur Reynolds' , age: 44, gender: 'Male' },
                    { id: 4, name: 'Dora Phelps'     , age: 49, gender: 'Female' },
                    { id: 5, name: 'Evan Cohen'      , age: 37, gender: 'Male' },
                    { id: 6, name: 'Bobby Lowe'      , age: 60, gender: 'Male' },
                    { id: 7, name: 'Phoebe Dunn'     , age: 33, gender: 'Male' },
                    { id: 8, name: 'Carrie Harmon'   , age: 52, gender: 'Female' }
                ]
            });
        }
    })
)(UsersList);


const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(
    <Provider store={ store }><App /></Provider>,
    container
);
