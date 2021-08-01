import { FC, useEffect } from 'react';
import './App.css';

import { RootState } from './store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'

import { GetWeather } from './store/weatherSlice';

import { Layout } from 'antd'

import { From } from './components/From'
import { WeatherCards } from './components/WeatherCards'
import { WeatherCity } from './interfaces/weather';

const { Header, Sider, Content } = Layout;

const App: FC = () => {
  const weather: Array<WeatherCity> = useSelector((state: RootState) => state.weather.sities)
  const dispatch = useDispatch()

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
