import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertInterface } from '../interfaces/alert'

interface initialState {
    isAlert: boolean,
    alertData: AlertInterface
}

const initialState: initialState = {
    isAlert: false,
    alertData: {
        message: "",
        description: "",
        type: "info"
    }
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<AlertInterface>) => {
            state.alertData = action.payload
            state.isAlert = true
        },
        deleteAlert: (state) => {
            state.isAlert = false
        }
    }
})

export const { setAlert, deleteAlert } = alertSlice.actions
export default alertSlice.reducer
