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
    page = page || 0;
    if (pageSize === undefined) {
        pageSize = items.length;
    }

    const from = page*pageSize;
    const to = from + pageSize;
    const pageCount = items.length && Math.ceil(items.length / pageSize);
    items = slice(from, to)(items);
    return {
        count: items.length,
        pageCount,
        pageSize,
        page,
        items
    };
}

export { createReducer, pageSlice };
