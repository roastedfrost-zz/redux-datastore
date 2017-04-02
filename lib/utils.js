import { slice } from 'ramda';

function createReducer(initialState, handlers) {
    return function reducer(state, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state || initialState;
        }
    };
}

function pageSlice(items, page, pageSize) {
    const from = page*pageSize;
    const to = from + pageSize;

    items = slice(from, to)(items);
    return {
        count: items.length,
        pageCount: items.length && Math.ceil(items.length / pageSize),
        pageSize,
        page,
        items
    };
}


export { createReducer };
