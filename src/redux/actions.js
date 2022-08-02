import * as types from "./actionType";
import axios from 'axios'

// get action
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

// delete action
const userDeleted = () => ({
    type: types.DELETE_USER,

})

// add user action
const userAdded = () => ({
    type: types.ADD_USER,
})

// update action
const userUpdated = () => ({
    type: types.UPDATE_USER,
})

// get single user action
const getUserOne = (users) => ({
    type: types.GET_SINGLE_USER,
    payload: users
})



// fetch data from json server api 
export const loadUsers = () => {
    return function (dispatch) {
        // axios.get("http://localhost:5000/user")
        axios.get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            // console.log("resp",resp)
            dispatch(getUsers(resp.data));
        })
        .catch((e) => console.log(e));
    };
};



// delete data according to action
export const deleteUsers = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        // axios.delete(`http://localhost:5000/user/${id}`)
        .then((resp) => {
            // console.log("resp",resp)
            dispatch(userDeleted(resp.data));
            dispatch(loadUsers());

        }).catch((e) => console.log(e));
    };
};


// add data to the json server
export const addUser = (user) => {

    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}`, user)
        // axios.post(`http://localhost:5000/user`, user)
        .then((resp) => {
            // console.log("resp",resp)
            // console.log("resp",user)
            dispatch(userAdded(user));
            dispatch(loadUsers());
        })
        .catch((e) => console.log(e));
    };

}


// fetch single user according to user id
export const getSingleUser = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        // axios.get(`http://localhost:5000/user/${id}`)
        .then((resp) => {
            // console.log("resp",resp)
            dispatch(getUserOne(resp.data));
        })
        .catch((e) => console.log(e));
    };
};


// update user
export const updateUser = (users, id) => {
    return function (dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${id}`, users)
        // axios.put(`http://localhost:5000/user/${id}`, users)
        .then((resp) => {
            // console.log("resp",resp)
            dispatch(userUpdated());
            // dispatch(getUsers(resp.data));
        })
        .catch((e) => console.log(e));
    };
};