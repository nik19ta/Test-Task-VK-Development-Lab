
import { RootState } from '../store/rootReducer'

import { useSelector, useDispatch } from 'react-redux'
import { Col, Layout, Row, Card, Tabs } from 'antd'
import { WeatherCity } from '../interfaces/weather';

const { TabPane } = Tabs;

export const Cards = () => {
    const weather: any = useSelector((state: RootState) => state.weather.sities)
    const days: Array<string> = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition={'top'}>
            {weather.map((city: any, k: number) => {
                    return (
                        <TabPane key={city.city_name} tab={city.city_name} >
                            {Object.keys(city.days).map(function (key, index) {
                            return (
                                <div key={key} >
                                    <Card className="weather_card" title={days[new Date(key).getDay()] + ":"} >
                                        <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 180 }}>
                                            {Object.keys(city.days[key]).map((item, i) => (
                                             <TabPane
                                                key={i}
                                                    tab={city.days[key][i].date.split(' ')[1].split(':')[0] + ":" + city.days[key][i].date.split(' ')[1].split(':')[1]} >

                                                    <img className="weather_image" src={city.days[key][i].icon} alt="weather icon" ></img>
                                                <p className="temperature" >
                                                        <span className="temperature__main" >temperature: {city.days[key][i].temp}°, </span>
                                                        <span className="temperature__feels_like" > feels like:  {city.days[key][i].temp_feels_like}°</span>
                                                </p>
                                                <div className="clouds_wind" >
                                                    <p className="clouds" >clouds: {city.days[key][i].clouds}</p>
                                                    <p className="wind" >wind: {city.days[key][i].wind}</p>
                                                </div>
                                            </TabPane>
                                        ))}
                                        </Tabs>
                                    </Card>
                                </div>)
                            })}
                        </TabPane>)
                })}
            </Tabs>

        </div>
    )
}
