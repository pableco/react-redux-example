import * as types from './actionTypes';
import axios from "axios";

const apiURL = process.env.REACT_APP_DEV_SERVER_URL;
const apiListURL = `${apiURL}list/`;
const apiHeaders = { "Content-Type": "application/json" };

export const sending_request = data => ({
    type: types.SENDING_REQUEST,
    payload: {
        loading: true,
    }
})

export const request_data = data => ({
    type: types.REQUEST_DATA,
    payload: {
        list: data.data,
        loading: false,
        q: data.config?.params?.q,
    }
})

export const request_error = error => ({
    type: types.REQUEST_ERROR,
    payload: {
        error: error,
        loading: false,
    }
})

export const request_item = data => ({
    type: types.REQUEST_ITEM,
    payload: {
        activeItem: data.data[0],
        loading: false,
    }
})

export const edit_item_in_store = data => ({
    type: types.EDIT_ITEM_IN_STORE,
    payload: {
        id: data.id,
        loading: false,
    }
})



/** GET **/

const getData = (data) => {
    return axios
        .get(
            apiListURL,
            {
                params: {
                    ...data
                },
            }
            )
        .then(res => res)
        .catch(error => error);
};

export const fetchData = (data) => dispatch => {
    dispatch(sending_request());
    return getData(data)
        .then(data => {
            dispatch(request_data(data));
        })
        .catch(error =>{
            dispatch(request_error(error));
        })
};

const getItem = (data) => {
    return axios
        .get(
            apiListURL,
            {
                headers: apiHeaders,
                params: {
                    ...data
                }
            }
        )
        .then(res => res)
        .catch(error => error);
};

export const fetchItem = (data) => dispatch => {
    dispatch(edit_item_in_store(data));
    dispatch(sending_request());
    return getItem(data)
        .then(data => {
            dispatch(request_item(data));
        })
        .catch(error => {
            dispatch(request_error(error));
        })
};

/** PUT **/

export const request_put_data = data => ({
    type: types.REQUEST_PUT_DATA,
    payload: {
        ok: data.status === 200,
        activeItem: data.data,
        loading: false,
    }
})

const putData = (data) => {
    return axios
        .put(
            `${apiListURL}${data.id}`,
            data,
            {
                headers: apiHeaders,
            }
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });
};

export const updateItem = (data) => dispatch => {
    dispatch(sending_request());
    return putData(data)
        .then(data => {
            dispatch(request_put_data(data));
        })
        .catch(error =>{
            dispatch(request_error(error));
        })
};

/** DELETE **/

export const delete_item_from_store = id => ({
    type: types.DELETE_FOM_STORE,
    payload: id
})

export const request_delete = (data, id) => ({
    type: types.REQUEST_DELETE,
    payload: {
        ok: data.status === 200,
        loading: false,
    }
})

const deleteData = (id) => {
    return axios
        .delete(
            `${apiListURL}${id}`,
            {
                headers: apiHeaders,
            }
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            return error;
        });
};

export const deleteItem = (id) => dispatch => {
    // this is an optimistic UI implementation 🤞 (1~3% of the requests fails)
    dispatch(delete_item_from_store(id));
    // trigger the delete api action on background
    dispatch(sending_request());
    return deleteData(id)
        .then(data => {
            dispatch(request_delete(data, id));
        })
        .catch(error =>{
            dispatch(request_error(error));
        })
};
