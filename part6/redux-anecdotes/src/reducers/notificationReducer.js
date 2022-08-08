import {createSlice} from "@reduxjs/toolkit";

const initialState = ''

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state, action) => {
            return action.payload;
        },
        removeNotification: (state, action) => {
            state = ''
            return state
        }
    }
})

const {createNotification, removeNotification} = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(createNotification(message))

        setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer