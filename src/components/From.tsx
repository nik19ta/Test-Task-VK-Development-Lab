import { useDispatch, useSelector } from 'react-redux'
import { FC, useRef } from 'react';

import { Form, Input, Button } from 'antd';
import { GetWeatherBySityName } from '../store/weatherSlice';
import { WeatherCity } from '../interfaces/weather';
import { RootState } from '../store/rootReducer';
import { setAlert } from '../store/alertSlice';


export const From: FC = () => {
    const weather: Array<WeatherCity> = useSelector((state: RootState) => state.weather.sities)
    const refInput = useRef<Input>(null);

    const dispatch = useDispatch()

    const onFinish = (values: { cityName: string }) => {
        if (refInput && refInput.current) {
            refInput.current.input.value = '';
        }

        for (let i = 0; i < weather.length; i++) {
            if (weather[i].city_name.toLowerCase() === values.cityName.toLowerCase()) {
                dispatch(setAlert({
                    message: "You can't add a city",
                    description: "The city has already been added",
                    type: "warning"
                }))
                return
            }
        }

        dispatch(GetWeatherBySityName(values.cityName))
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="form" >

            <p className="from__title" >Type cities for example london or vladimir</p>

            <Form.Item
                label="city name"
                name="cityName"
                rules={[{ required: true, message: 'Please input city name!' }]} >
                <Input ref={refInput} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                <Button className="submitBtn" type="primary" htmlType="submit">
                    Add city
                </Button>
            </Form.Item>
        </Form>
    )
}
