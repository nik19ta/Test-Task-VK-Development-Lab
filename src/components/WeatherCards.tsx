
import { RootState } from '../store/rootReducer'

import { useSelector, useDispatch } from 'react-redux'
import { Card, Tabs } from 'antd'
import { WeatherCity } from '../interfaces/weather';

import { WeatherCard } from './WeatherCard'

import { deleteCity } from '../store/weatherSlice'

const { TabPane } = Tabs;

export const WeatherCards = () => {
    const dispatch = useDispatch()
    const weather: Array<WeatherCity> = useSelector((state: RootState) => state.weather.sities)

    const onEdit = (activeKey: string | object) => {
        if (typeof activeKey == "string") {
            dispatch(deleteCity(activeKey))
        } else {
            console.log('create');
        }
    };

    return (
        <Tabs
            type="editable-card"
            onEdit={onEdit}
            defaultActiveKey="0"
            hideAdd={true}
            tabPosition={'top'}>
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
