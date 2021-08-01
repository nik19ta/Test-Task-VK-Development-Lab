
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
                                            {Object.keys(weather[0].days[key]).map((item, i) => (
                                             <TabPane
                                                key={i}
                                                tab={weather[0].days[key][i].date.split(' ')[1].split(':')[0] + ":" + weather[0].days[key][i].date.split(' ')[1].split(':')[1]} >

                                                <img className="weather_image" src={weather[0].days[key][i].icon} alt="weather icon" ></img>
                                                <p className="temperature" >
                                                    <span className="temperature__main" >temperature: {weather[0].days[key][i].temp}°, </span>
                                                    <span className="temperature__feels_like" > feels like:  {weather[0].days[key][i].temp_feels_like}°</span>
                                                </p>
                                                <div className="clouds_wind" >
                                                    <p className="clouds" >clouds: {weather[0].days[key][i].clouds}</p>
                                                    <p className="wind" >wind: {weather[0].days[key][i].wind}</p>
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
