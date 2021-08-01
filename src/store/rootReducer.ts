import { configureStore } from '@reduxjs/toolkit'
import { weatherSlice } from './weatherSlice'
import { alertSlice } from './alertSlice'

const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        alert: alertSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
