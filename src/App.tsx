import React, { FC, useEffect } from 'react';
import './App.css';

import { RootState } from './store/rootReducer'
import { useSelector, useDispatch } from 'react-redux'

import { GetWeather } from './store/weatherSlice';

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
    <div className="App">
      <div>
          <pre> { JSON.stringify(weather, null, 2) } </pre>
      </div>
    </div>
  )
};

export default App;
