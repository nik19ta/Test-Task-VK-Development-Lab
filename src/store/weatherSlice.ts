import {
    createSlice,
    createAsyncThunk,
    PayloadAction
} from '@reduxjs/toolkit'

import {
    WeatherDay,
    WeatherCity,
    AccumulatorDay,
    WeatherApi,
    WeatherDayApi,
    Coordinates
} from '../interfaces/weather'

async function formatWeather(res: WeatherApi) {
    let days: {
        [value: string]: Array<WeatherDay>
    } = res.list.reduce((accumulator: AccumulatorDay, currentValue: WeatherDayApi) => {

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

export const GetWeatherBySityName = createAsyncThunk(
    "weather/GetWeatherBySityName",
        async (sityName: string, { }) => {
            const response: Response = await fetch(`
            https://api.openweathermap.org/data/2.5/forecast?q=${sityName}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`)

            const res: WeatherApi = await response.json();

            return await formatWeather(res) as WeatherCity
        })

export const GetWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (coordinates: Coordinates, {}) => {
        const response: Response = await fetch(`
            https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`)

        const res: WeatherApi = await response.json();

        return await formatWeather(res) as WeatherCity
    })

interface initialState {
    sities: Array<WeatherCity>,
    errors: boolean
}

const initialState: initialState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState') as string) as initialState : {
        sities: [],
        errors: false
    } as initialState


export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        deleteCity: (state, action: PayloadAction<string>) => {
            state.sities = state.sities.filter((item: WeatherCity)  => {
                return item.city_name !== action.payload
            })
        },
        delError: (state) => {
            state.errors = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetWeatherBySityName.fulfilled, (state, action) => {
            state.sities.push(action.payload)
        })
        builder.addCase(GetWeatherBySityName.rejected, (state) => {
            console.log('error');
            state.errors = true
        })
        builder.addCase(GetWeather.fulfilled, (state, action) => {
            for (let i = 0; i < state.sities.length; i++) {
                if (state.sities[i].city_name == action.payload.city_name) {
                    return
                }

            }
            state.sities.push(action.payload)
        })
        builder.addCase(GetWeather.rejected, (state) => {
            console.log('error');
        })
    }
})

export const { deleteCity, delError } = weatherSlice.actions
export default weatherSlice.reducer
