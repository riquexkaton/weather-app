import React, { useState, useEffect } from 'react'
import axios from "axios";
import "../styles/weather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faSearch, faTimes, faTint, faWind } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from "framer-motion";
import { animationForm, animationImg, weatherSection } from "../animations/animations";
import Error from "./error";

const Weather = () => {

    //estado de la aplicacion
    const [forecastList, setForecastList] = useState([]);
    const [weatherToday, setWeatherToday] = useState({
        temp: "0",
        state: "cielo despejado",
        wind: 30,
        humidity: 10,
        icon: ""
    });
    const [value, setValue] = useState("");
    const [city, setCity] = useState("venezuela");
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(value);
        setOpen(false);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                setForecastList([]);
                let aux = "";
                const arr = [];
                const res1 = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&units=metric&appid=95d1818b74acc32f56b0879dad233182`);
                setWeatherToday({
                    temp: res1.data.main.temp,
                    state: res1.data.weather[0].description,
                    wind: res1.data.wind.speed,
                    humidity: res1.data.main.humidity,
                    icon: res1.data.weather[0].icon
                });
                const res2 = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=95d1818b74acc32f56b0879dad233182`);
                res2.data.list.forEach(item => {
                    const compare = item.dt_txt.match(/^\w+-\w+-\w+\s/).join("");
                    if (aux !== compare) {
                        aux = compare;
                        arr.push(item);
                    }
                });
                setForecastList(arr);
                setError(false);
            }
            catch (err) {
                setError(true);
            }
        }

        fetchData();
    }, [city]);




    let day = date.getDay();
    const forecastCards = forecastList.map((item, index) => {
        const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "viernes", "sabado"];
        let currentDay = day;
        if (day > 6) {
            currentDay = 0;
            day = 0;
            day++;
        }
        else {
            day++;
        }
        if (index === 5) {
            return null;
        }
        return (
            <motion.div className="card" key={index} variants={animationForm} initial={"initial"} animate={"animate"} exit={"exit"}>
                <h4>{days[currentDay]}</h4>
                <img src={`/img/${item.weather[0].icon}.png`} alt="icon" />
                <p>{item.main.temp}<FontAwesomeIcon className="centigrade" icon={faDotCircle} /></p>
            </motion.div>
        )
    });

    return (
        <div className="weather-container">
            <button className="open-form" onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
            <AnimatePresence>
                {
                    open &&
                    <motion.div  layout className="form-container" variants={animationForm} initial={"initial"} animate={"animate"} exit={"exit"}>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="city">Buscar una localizacion</label>
                            <div>
                                <input type="text" id="city" onChange={(e) => setValue(e.target.value)} />
                                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                            </div>
                        </form>
                        <button className="exit-form" onClick={() => setOpen(false)}>
                            <FontAwesomeIcon icon={faTimes} className="exit-icon" />
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
            <header>
                <img src="/img/logo.svg" alt="logo" />
                <h2>RiquexWeather</h2>
            </header>
            <AnimatePresence>
                {
                    error ?
                        <Error />
                        :
                        (<motion.div className="wheather-today" variants={weatherSection} initial={"initial"} animate={"animate"} exit={"exit"}>
                            <div className="wheather-today-temperature">
                                <motion.img src={`/img/${weatherToday.icon}.png`} alt="" variants={animationImg} animate={"animate"}/>
                                <p>{city.match(/.{1,10}/).join("")}<br /><span>{weatherToday.temp}<FontAwesomeIcon className="icon-centigrade" icon={faDotCircle} /></span></p>
                            </div>
                            <p className="wheather-today-status">{weatherToday.state}</p>
                            <div className="weather-wind">
                                <div className="item">
                                    <FontAwesomeIcon icon={faTint} className="icon" />
                                    <p>{weatherToday.humidity}%</p>
                                </div>
                                <div className="item">
                                    <FontAwesomeIcon icon={faWind} className="icon" />
                                    <p>{weatherToday.wind}km/h</p>
                                </div>
                            </div>
                            <div className="forecast-cards">
                                <AnimatePresence>
                                    {
                                        forecastCards
                                    }
                                </AnimatePresence>
                            </div>
                        </motion.div>)
                }
            </AnimatePresence>
        </div>
    )
}

export default Weather
