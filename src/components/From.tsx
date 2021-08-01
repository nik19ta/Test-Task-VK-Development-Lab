import { useDispatch } from 'react-redux'
import { FC, useRef } from 'react';

import { Form, Input, Button } from 'antd';
import { GetWeatherBySityName } from '../store/weatherSlice';


export const From: FC = () => {
    const refInput = useRef<Input>(null);
    const dispatch = useDispatch()

    const onFinish = (values: { cityName: string }) => {
        if (refInput && refInput.current) {
            refInput.current.input.value = '';
        }
        dispatch(GetWeatherBySityName(values['cityName']))
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
