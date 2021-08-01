import { useDispatch } from 'react-redux'
import { FC } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import { GetWeatherBySityName } from '../store/weatherSlice';

export const From: FC = () => {
    const dispatch = useDispatch()

    const onFinish = (values: { cityName: string }) => {
        console.log('Success:', values);
        dispatch(GetWeatherBySityName(values['cityName']))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="form"
        >
            <Form.Item
                label="city name"
                name="cityName"
                rules={[{ required: true, message: 'Please input city name!' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                <Button className="submitBtn" type="primary" htmlType="submit">
                    Add city
                </Button>
            </Form.Item>
        </Form>
    )
}
