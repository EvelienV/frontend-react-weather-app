import React, {useContext} from 'react';
import {TempContext} from "../../context/TempProvider";
import './WeatherDetail.css';
import setWeatherIcon from "../../helpers/iconMapper";

function WeatherDetail({
                         description,
                         temp,
                         type,
                       }) {
  const {kelvinToMetric} = useContext(TempContext);

  return (
    <section className="day-part">
      <span className="icon-wrapper">
        {setWeatherIcon(type)}
      </span>
      <p className="description">{description}</p>
      <p>{kelvinToMetric(temp)}</p>
    </section>
  );
};

export default WeatherDetail;
