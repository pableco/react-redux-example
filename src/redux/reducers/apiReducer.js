import * as types from '../actions/actionTypes';
const initialState ={
    list: [],
    q: null,
    loading: false,
    error: null,
};

const apiState = (state = initialState, action) => {
    switch (action.type) {
        case types.SENDING_REQUEST: {
            return {
                ...state,
                loading: action.payload.loading,
            }
        }
        case types.REQUEST_DATA: {
            return {
                ...state,
                list: action.payload.list,
                loading: action.payload.loading,
                q: action.payload.q,
            }
        }
        case types.REQUEST_ERROR: {
            return {
                ...state,
                error: action.payload.error,
                loading: action.payload.loading
            }
        }
        case types.REQUEST_ITEM: {
            return {
                ...state,
                activeItem: action.payload.activeItem,
                error: action.payload.error,
                loading: action.payload.loading
            }
        }
        case types.EDIT_ITEM_IN_STORE: {
            return {
                ...state,
                loading: action.payload.loading,
                // find selected item by ide to the store
                activeItem: state.list.find((item) => item.id === action.payload.id)
            }
        }
        case types.REQUEST_PUT_DATA: {
            return {
                ...state,
                ok: action.payload.ok,
                activeItem: action.payload.activeItem,
                loading: action.payload.loading
            }
        }
        case types.DELETE_FOM_STORE: {
            return {
                ...state,
                // only remove the element form the store
                list: state.list.filter((item) => item.id !== action.payload)
            }
        }
        case types.REQUEST_DELETE: {
            return {
                ...state,
                ok: action.payload.ok,
                loading: action.payload.loading,
            }
        }
        default: return state;
    }
}

export default apiState;
