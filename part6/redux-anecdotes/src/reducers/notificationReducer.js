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

export const {createNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer