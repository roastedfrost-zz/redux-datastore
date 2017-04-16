// jshint esversion: 6

import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { sortBy, prop, slice, times } from 'ramda';
import { pageSlice } from '../lib/utils';

const PAGE_SIZE = 3;

const usersSelector = createSelector(
    store => store.data,
    store => store.filter,
    store => store.sorting,
    store => store.pagination,
    (data, filter, sorting, pagination) => {
        data = data || [];
        data = data.filter(item => filter ? item.gender === filter : true);
        if (sorting) {
            data = sortBy(prop(sorting))(data);
        }
        return pageSlice(data, pagination, PAGE_SIZE);
    }
);



class UsersList extends Component {
    componentWillMount() {
        const { datastore, storePaginate } = this.props;
        const { loadUsers } = this.props;
        storePaginate(datastore)(0);
        loadUsers();
    }

    handleGenderFilter(value) {
        const { datastore, storeFilter } = this.props;
        storeFilter(datastore)(value);
    }

    handleSort(value) {
        const { datastore, storeSort } = this.props;
        storeSort(datastore)(value);
    }

    handleSetPage(value) {
        const { datastore, storePaginate } = this.props;
        storePaginate(datastore)(value);
    }

    render() {
        const { datastore } = this.props;
        const data = usersSelector(datastore);

        const userItem = data => (
            <tr key={ data.id }>
                <td>{ data.name }</td>
                <td>{ data.age }</td>
                <td>{ data.gender }</td>
            </tr>
        );
        const userItems = data => data.map(userItem);
        const usersList = items => (
            <table>
                <thead>
                    <tr>
                        <th className={ datastore.sorting === 'name' ? 'active' : '' } onClick={ e => this.handleSort('name') } >Name</th>
                        <th className={ datastore.sorting === 'age' ? 'active' : '' } onClick={ e => this.handleSort('age') }>Age</th>
                        <th className={ datastore.sorting === 'gender' ? 'active' : '' } onClick={ e => this.handleSort('gender') }>Gender</th>
                    </tr>
                </thead>
                <tbody>{ userItems(items) }</tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="pagination">
                        { times(page => {
                            const isActive = page === data.page;
                            return (<span key={page} className={ isActive ? 'active' : '' }
                                    onClick={ e => this.handleSetPage(page) }>{ page + 1 }
                                    </span>);
                        }, data.pageCount) }
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
        return (<div className="usersList">
                    <div className="filter">
                        <div>
                        <span className={ !datastore.filter ? 'active' : '' } onClick={ e => this.handleSort('name') } onClick={ e => this.handleGenderFilter() }>all</span>
                        <span className={ datastore.filter === 'Male' ? 'active' : '' } onClick={ e => this.handleSort('name') } onClick={ e => this.handleGenderFilter('Male') }>male</span>
                        <span className={ datastore.filter === 'Female' ? 'active' : '' } onClick={ e => this.handleSort('name') } onClick={ e => this.handleGenderFilter('Female') }>female</span>
                        </div>
                    </div>
                    { usersList(data.items) }
                </div>);
    }
}

export default UsersList;
