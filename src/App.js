import { useEffect, useState } from "react";
import Descriptions from "./components/Descriptions";

import fewClouds from "./assets/fewClouds.jpg";
import clouds from "./assets/clouds.jpg";
import thunderstorm from "./assets/thunderstorm.jpg";
import mist from "./assets/mist.jpg";
import snow from "./assets/snow.jpg";
import rain from "./assets/rain.jpg";

import getFormatedWeatherData from "./weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [icon, setIcon] = useState('01d');
  const [city, setCity] = useState('Marseille');
  const [timezone, setTimezone] = useState('');

  const [searchedCity, setSearchedCity] = useState('');
  const [background, setBackground] = useState(fewClouds);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatedWeatherData(city, units, icon, timezone);
        setWeather(data);
      
   // dynamic date and time

    const localeDate = new  Date()
    const localeTime =  localeDate.getTime()    //obtain current local time in milliseconds
    const localOffset = localeDate.getTimezoneOffset() * 60000   // obtain local time offset in milliseconds
    const utc = localeTime + localOffset   // obtain current UTC time
    const  foreignTimezone = utc + (1000 *  (data.timezone) )  // Obtain destination city's offset in hours and convert to milliseconds
    
    const foreignDate = new Date(foreignTimezone).toLocaleDateString('fr-FR', {day: 'numeric', weekday: 'long', month:'long', year:'numeric'}) 
    const foreignCurrentTime = new Date(foreignTimezone).toLocaleTimeString('en-US', { hour12: false })
    
    if (data.timezone === 7200) {
      setCurrentDate()
      setCurrentTime()
    } else {
      setCurrentDate(foreignDate)
      setCurrentTime(foreignCurrentTime)
    }
  

   //dynamic background
    if (data.icon === '01d' || data.icon === '01n'  || data.icon === '02d' || data.icon === '02n') {
      setBackground(fewClouds)
    } else if (data.icon === '03d' || data.icon === '03n' || data.icon === '04d' || data.icon === '04n') {
      setBackground(clouds)
    } else if (data.icon === '09d' || data.icon === '09n' || data.icon === '10d' || data.icon === '10n') {
      setBackground(rain)
    } else if (data.icon === '11d' || data.icon === '11n') {
      setBackground(thunderstorm)
    } else if (data.icon === '13d' || data.icon === '13n') {
      setBackground(snow)
    } else if (data.icon === '50d' || data.icon === '50n') {
      setBackground(mist)
    } else setBackground()

  };

fetchWeatherData();

}, [units, city, icon, timezone]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1)
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial')
  }

  const handleSubmitCity = (e) => {
    e.preventDefault();
    if (searchedCity) {
      setCity(searchedCity);
      setSearchedCity('');
    }
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${background})`}}>
      <div className="overlay">
        { /* container render only if weather is not null */ }
        {weather && 
        <div className="container">
          <div className="section section_inputs">
            <div className="section local_time">
              <h1>{new Date().toLocaleDateString('fr-FR', {day: 'numeric', weekday: 'long', month:'long', year:'numeric'})}</h1>
              <h2>{new Date().toLocaleTimeString('en-US', { hour12: false })}</h2>
            </div>
            <div >
              <form className="form_city" onSubmit={handleSubmitCity}>
              <input  onChange={(e) => setSearchedCity(e.target.value)} type="text" value={searchedCity} placeholder="Entrez une ville ..." />
              <button>OK</button>
              </form>
            </div>
          </div>
          <div className="section section_temperature">
            <div className="icon">
              <h2>{`${weather.name}, ${weather.country}`}</h2>
              <h3>{currentDate}  {currentTime}</h3>
              <img src={weather.iconURL} alt="weatherIcon" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>  {/* toFixed remove decimals */}
              <button className="units_button" onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
          </div>
          {/*Bottom description */}
          <Descriptions weather ={weather} units={units}/>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
