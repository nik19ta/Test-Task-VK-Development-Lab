import React from 'react'

import { Card, Tabs } from 'antd'
import { WeatherCity } from '../interfaces/weather';
const { TabPane } = Tabs;

export const WeatherCard = (props: { index: string, city: WeatherCity }) => {

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
        <Card className="weather_card" title={days[new Date(props.index).getDay()] + ":"} >
            <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 180 }}>
                {Object.keys(props.city.days[props.index]).map((_: string, i: number) => (
                    <TabPane
                        key={i}
                        tab={props.city.days[props.index][i].date.split(' ')[1].split(':')[0]
                            + ":" + props.city.days[props.index][i].date.split(' ')[1].split(':')[1]}>

                        <img
                            className="weather_image"
                            src={props.city.days[props.index][i].icon}
                            alt="weather icon" ></img>

                        <p className="temperature" >
                            <span className="temperature__main" >
                                temperature: {props.city.days[props.index][i].temp}°
                            </span>
                            <span className="temperature__feels_like" >
                                feels like: {props.city.days[props.index][i].temp_feels_like}°
                            </span>
                        </p>
                        <div className="clouds_wind" >
                            <p className="clouds" >clouds: {props.city.days[props.index][i].clouds}%</p>
                            <p className="wind" >wind: {props.city.days[props.index][i].wind} M/s</p>
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        </Card>
    )
}
