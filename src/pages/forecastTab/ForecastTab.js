import React, {useContext, useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import createDateString from "../../helpers/createDateString";
import {TempContext} from "../../context/TempProvider";

function ForecastTab({coordinates}) {
  const [forecasts, setForcasts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {kelvinToMetric} = useContext(TempContext);

  useEffect(() => {
    async function fetchData() {
      setError(false);
      setLoading(true);
      try {
        const result = await
          axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`)
        setForcasts(result.data.daily.slice(1, 6));
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }

    }

    if (coordinates) {
      fetchData();
    }
  }, [coordinates]);


  return (
    <div className="tab-wrapper">
      {forecasts && forecasts.map((forecast) => {
        return (
          <article className="forecast-day" key={forecast.dt}>
            <p className="day-description">
              {createDateString(forecast.dt)}
            </p>

            <section className="forecast-weather">
              <span>
                {kelvinToMetric(forecast.temp.day)}
              </span>
              <span className="weather-description">
                {forecast.weather[0].description}
              </span>
            </section>
          </article>
        )
      })}
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
}

export default ForecastTab;
