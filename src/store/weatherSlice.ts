import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import {
    WeatherDay,
    WeatherCity,
    AccumulatorDay,
    WeatherApi,
    WeatherDayApi,
    Coordinates
} from '../interfaces/weather'

export const GetWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (coordinates: Coordinates, {}) => {
        const response: Response = await fetch(`
            https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${'52d1d8f3095914669900b1bcc8569c2e'}&units=metric`)

        const res: WeatherApi = await response.json();
        let days: any = res.list.reduce((accumulator: AccumulatorDay, currentValue: WeatherDayApi) => {

            let obj: WeatherDay = {
                date: currentValue.dt_txt,
                icon: `http://openweathermap.org/img/wn/${currentValue.weather[0].icon}@2x.png`,
                clouds: currentValue.clouds.all,
                wind: currentValue.wind.speed,
                temp: currentValue.main.temp,
                temp_feels_like: currentValue.main.feels_like
            }

            if (!accumulator[currentValue.dt_txt.split(' ')[0]]) {
                accumulator[currentValue.dt_txt.split(' ')[0]] = [obj]
            } else {
                accumulator[currentValue.dt_txt.split(' ')[0]].push(obj)
            }

            return accumulator
        }, {})

        return {
            city_name: res.city.name,
            country: res.city.country,
            days: days,
        } as WeatherCity
    }
)

interface initialState {
    sities: Array<WeatherCity>,
    loading: boolean
}

const initialState: initialState = {
    sities: [],
    loading: true
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetWeather.fulfilled, (state, action) => {
            state.sities.push(action.payload)
        })
    }
})

export default weatherSlice.reducer
