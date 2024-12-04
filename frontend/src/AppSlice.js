import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: "app",
    initialState: {
        modal: {
            title: "",
            message: ""
        }
    },
    reducers: {
        updateModal: (state, action) => {
            state.modal = action.payload
        }
    }
})
export const {setCurrentCMP, updateModal} = appSlice.actions 
export default appSlice.reducer