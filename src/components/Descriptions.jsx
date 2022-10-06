import React from 'react';
import { FaArrowUp, FaArrowDown, FaWind } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';
import { MdCompress, MdOutlineWaterDrop } from 'react-icons/md';

import './descriptions.css';

const Descriptions = ({weather, units}) => {

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'm/s' : 'm/h';

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: weather.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: weather.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id: 3,
            icon: <BiHappy />,
            title: "température ressentie",
            data: weather.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id: 4,
            icon: <MdCompress />,
            title: "pression",
            data: weather.pressure,
            unit: "hPa",
        },
        {
            id: 5,
            icon: <MdOutlineWaterDrop />,
            title: "humidité",
            data: weather.humidity,
            unit: "%",
        },
        {
            id: 6,
            icon: <FaWind />,
            title: "vitesse du vent",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
        ];
        
    return (
        <div>
            <div className='section section_descriptions'>
                {cards.map(({id, icon, title, data, unit}) => (
                <div key={id} className='card'>
                    <div className='description_card-icon'>
                        {icon}
                        <small>{title}</small>
                    </div>
                    <h2>{`${data} ${unit}`}</h2>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Descriptions;