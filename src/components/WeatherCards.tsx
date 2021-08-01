
import { RootState } from '../store/rootReducer'

import { useSelector } from 'react-redux'
import { Card, Tabs } from 'antd'
import { WeatherCity } from '../interfaces/weather';

import { WeatherCard } from './WeatherCard'

const { TabPane } = Tabs;

export const WeatherCards = () => {
    const weather: Array<WeatherCity> = useSelector((state: RootState) => state.weather.sities)

    return (
        <Tabs defaultActiveKey="1" tabPosition={'top'}>
            {weather.map((city: WeatherCity, k: number) => {
            return (
                <TabPane key={city.city_name} tab={city.city_name} >
                    {Object.keys(city.days).map(function (key: string) {
                        return (<div key={key} > <WeatherCard index={key} city={city} /> </div>)
                    })}
                </TabPane>)
            })}
        </Tabs>
    )
}
