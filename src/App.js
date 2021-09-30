import React, {Fragment, useContext, useEffect, useState} from 'react';
import axios from "axios";
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import {TempContext} from "./context/TempProvider";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {kelvinToMetric} = useContext(TempContext);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      setLoading(true);
      try {
        const currentWeather = await
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
        setWeatherData(currentWeather.data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <Fragment>
      <div className="weather-container">
        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation}/>
          {error && (
            <span>
                Voor deze locatie kan geen weer gevonden worden
            </span>
          )}
          <span className="location-details">
            {loading && (<span>Loading...</span>)}

            {weatherData &&
            <Fragment>
              <h2>{weatherData.weather[0].description}</h2>
              <h3>{weatherData.name}</h3>
              <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
            </Fragment>
            }
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <Router>
            <TabBarMenu/>

            <div className="tab-wrapper">
              <Switch>
                <Route exact path="/">
                  <TodayTab coordinates={weatherData && weatherData.coord}/>
                </Route>
                <Route path="/komende-week">
                  <ForecastTab coordinates={weatherData && weatherData.coord}/>
                </Route>
              </Switch>
            </div>
          </Router>
        </div>

        <MetricSlider/>
      </div>
    </Fragment>
  );
}

export default App;
