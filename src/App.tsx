import { FC, useEffect } from 'react';
import './App.css';

import { RootState } from './store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'

import { delError, GetWeather } from './store/weatherSlice';

import { Layout } from 'antd'

import { From } from './components/From'
import { WeatherCards } from './components/WeatherCards'
import { WeatherCity } from './interfaces/weather';

import { AlertComponent } from './components/Alert'
import { AlertInterface } from './interfaces/alert';
import { setAlert } from './store/alertSlice';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const dispatch = useDispatch()

  const weather: Array<WeatherCity> = useSelector((state: RootState) => state.weather.sities)
  const isAlert: boolean = useSelector((state: RootState) => state.alert.isAlert)
  const dataAlert: AlertInterface = useSelector((state: RootState) => state.alert.alertData)
  const isError: boolean = useSelector((state: RootState) => state.weather.errors)

  if (isError) {
    dispatch(setAlert({
      message: "You can't add a city",
      description: "The city was not found",
      type: "error"
    }))
    dispatch(delError())
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(GetWeather({
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
      }))
    })
  }, [navigator])

  return (
      <Layout>
        <Header className="header" >
          <h1 className="header__title" >Weather</h1>
        </Header>

        {isAlert &&
          <AlertComponent
              message={dataAlert.message}
              description={dataAlert.description}
              type={dataAlert.type}
          />}

        <Layout className="main" >
          <Sider className="sider" >
            <From />
          </Sider>
          <Content className="content" >
            {JSON.stringify(weather).length > 3 && <WeatherCards />}
          </Content>
        </Layout>
      </Layout>
  )
};

export default App;
