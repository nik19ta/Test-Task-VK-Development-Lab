import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Alert } from 'antd';
import { AlertInterface } from '../interfaces/alert'
import { setTimeout } from 'timers';
import { deleteAlert } from '../store/alertSlice';

export const AlertComponent = (props: AlertInterface)  => {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(deleteAlert())
        }, 3000)
    }, [])

    return (
        <Alert
            message={props.message}
            description={props.description}
            type={props.type}
            showIcon
        />
    )
}
