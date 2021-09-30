import React from 'react';
import {ReactComponent as Clouds} from "../assets/icons/clouds.svg";
import {ReactComponent as Rain} from "../assets/icons/rain.svg";
import {ReactComponent as Snow} from "../assets/icons/snow.svg";
import {ReactComponent as Sun} from "../assets/icons/sun.svg";
import {ReactComponent as SunRain} from "../assets/icons/sun-rain.svg";
import {ReactComponent as Thunder} from "../assets/icons/thunder.svg";
import {ReactComponent as Wind} from "../assets/icons/wind.svg";

function setWeatherIcon(weatherType) {
  switch (weatherType) {
    case 'Clear':
      return <Sun/>;
    case 'Clouds':
      return <Clouds/>;
    case 'Drizzle':
      return <SunRain/>;
    case 'Rain':
      return <Rain/>;
    case 'Snow':
      return <Snow/>;
    case 'Thunder':
      return <Thunder/>;
    case 'Mist':
    case 'Haze':
    case 'Smoke':
    case 'Fog':
    default:
      return <Wind/>;
  }
}

export default setWeatherIcon;