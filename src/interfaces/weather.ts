export interface schema {
    icon: string,
    description: string,
    temp_min: string,
    temp_max: string,
    feels_like: string
}

export interface WeatherDay {
    date: string,
    icon: string,
    clouds: number,
    wind: number,
    temp: number,
    temp_feels_like: number
}

export interface WeatherCity {
    city_name: string,
    country: string,
    days: {
        [value: string]: WeatherDay
    }
}

export interface AccumulatorDay {
    [value: string]: Array<WeatherDay>
}

export interface Coordinates {
    lat: string,
    lon: string,
}
export interface apiGeoLocation {
    coord: {
        lon: number,
        lat: number
    },
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: string,
    }>,
    base: string
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: Array<{
        speed: number,
        deg: number,
        gust: number
    }>,
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface WeatherApi {
    cod: number
    message: number
    cnt: number
    list: Array<WeatherDayApi>
    city: {
        id: number
        name: string
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}

export interface WeatherDayApi {
    clouds: {
        all: number
    },
    dt: number,
    dt_txt: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number
    }
    pop: number,
    sys: {
        pod: string
    },
    visibility: number,
    weather: Array<{
        description: string,
        icon: string
        id: number
        main: string
    }>,
    wind: {
        speed: number
        deg: number
        gust: number
    }
}
