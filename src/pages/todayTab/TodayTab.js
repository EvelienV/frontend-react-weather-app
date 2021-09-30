import React, {Fragment, useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

function TodayTab({coordinates}) {
  const [forecasts, setForcasts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      setLoading(true);
      try {
        const result = await
          axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
        setForcasts([
          result.data.hourly[3],
          result.data.hourly[5],
          result.data.hourly[7],
        ])
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    if (coordinates) {
      fetchData();
    }
  }, [coordinates]);

  return (
    <div className="tab-wrapper">
      {forecasts &&
      <Fragment>
        <div className="chart">
          {forecasts.map((forecast) => {
            return <WeatherDetail
              key={forecast.dt}
              temp={forecast.temp}
              type={forecast.weather[0].main}
              description={forecast.weather[0].description}
            />
          })}
        </div>
        <div className="legend">
          {forecasts.map((forecast) => {
            return <span key={forecast.dt}>{createTimeString(forecast.dt)}</span>
          })}

        </div>
      </Fragment>
      }
      {loading && (
        <span>
          Loading...
        </span>
      )}
      {!forecasts && !error && !loading && (
        <span className="no-forecast">
          Zoek eerst een locatie om het weer voor deze week te bekijken
        </span>
      )}
      {error && (
        <span>
          Er is iets misgegaan met het ophalen van de data
        </span>
      )}
    </div>
  );
};

export default TodayTab;
