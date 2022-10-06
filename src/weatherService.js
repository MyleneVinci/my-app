

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

/* function allow to get data city and units dynamically from weather API */
const getFormatedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}&lang=fr`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);
    console.log(data)

    /* object restructuring, data from API*/    

    const {
        weather, 
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: {speed},
        sys: {country},
        name,
        timezone,
    } = data;

    const {description, icon, main} = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon), 
        icon,
        main,
        timezone,
        temp, 
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name
    };
}

export default getFormatedWeatherData;