import React, { FC, useEffect } from 'react';
import './App.css';


import { RootState } from './store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'

import { GetWeather } from './store/weatherSlice';

import { Col, Layout, Row, Card, Tabs } from 'antd'

import { From } from './components/From'
import { Cards } from './components/Cards'

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

const App: FC = () => {
  const weather: any = useSelector((state: RootState) => state.weather.sities)
  const dispatch = useDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      dispatch(GetWeather({
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
      }))
    })
  }, [])

  return (
      <Layout>
        <Header>
          <h1 className="header__title" >Weather</h1>
        </Header>
        <Layout>
          <Sider className="sider" >
            <From />
          </Sider>
          <Content>
            {JSON.stringify(weather).length > 3 && <Cards />}
          </Content>
        </Layout>
      </Layout>
  )
};

export default App;
