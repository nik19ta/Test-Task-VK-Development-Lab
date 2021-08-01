import { Form, Input, Button, Checkbox } from 'antd';

export const From = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
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
                name="city name"
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
