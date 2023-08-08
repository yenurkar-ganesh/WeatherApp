import React, { useEffect, useState } from "react";
import classes from "./Hero.module.css";
import axios from "axios";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { WiHumidity } from "react-icons/wi";
import { GiWindmill } from "react-icons/gi";

const Hero = (props) => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const urlId = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=db183ee411686cb2b219f76ad10a58a0`;

  const searchLocationHandler = (event) => {
    // props.setLoader(true);
    if (event.key === "Enter") {
      props.setLoader(true);
      axios.get(urlId).then((response) => {
        setData(response.data);
        console.log(response.data);
        props.setLoader(false);
      });
    }
  };

  return (
    <>
      <div
        className={classes.container}
        style={{
          backgroundImage: `url(https://source.unsplash.com/4750x3168/?nature) `,
        }}
      >
        {/*-------- SEARCHBAR ----------*/}
        <div className={classes.search}>

          <input
            className={classes.bar}
            type="text"
            value={location}
            placeholder="Search by city"
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={searchLocationHandler}
          />
        </div>

        {data.name !== undefined ? (
          <div className={classes.card}>
            {/* ------------- TOP ----------- */}
            <div className={classes.top}>
              <div className={classes.city}>
                <h2 style={{ alignItems: `center` }}>{data.name},</h2>
                {data.sys && <h2>{data.sys.country}</h2>}
                {data.weather && (
                  <h2 style={{ alignItems: `center` }}>
                    <TiWeatherWindyCloudy />
                  </h2>
                )}
              </div>

              <div className={classes.temp}>
                {data.main && (
                  <h1>{(data.main.temp - 32).toFixed() * 0.5}°C</h1>
                )}
              </div>

              <div className={classes.desc}>
                {data.weather && <h2>{data.weather[0].main}</h2>}
              </div>
            </div>

            {/* ------------ BOTTOM -----------  */}
            <div className={classes.bottom}>
              <div className={classes.min_temp}>
                <p className={classes.bold}>Min. Temperature</p>
                {data.main && (
                  <p>{(data.main.temp_min - 32).toFixed() * 0.5}°C</p>
                )}
              </div>

              <div className={classes.feels}>
                <p className={classes.bold}> Feels like</p>
                {data.main && (
                  <p>
                    {(data.main.feels_like - 32).toFixed() * 0.5}°C{" "}
                    <LiaTemperatureHighSolid />{" "}
                  </p>
                )}
              </div>
              <div className="humidity">
                <p className={classes.bold}>Humidity</p>
                {data.main && (
                  <p>
                    {data.main.humidity}% <WiHumidity />{" "}
                  </p>
                )}
              </div>
              <div className={classes.wind}>
                <p className={classes.bold}>Wind Speed</p>
                {data.wind && (
                  <p>
                    {(data.wind.speed * 1.609).toFixed()} K/h <GiWindmill />{" "}
                  </p>
                )}
              </div>

              <div className={classes.max_temp}>
                <p className={classes.bold}>Max. Temperature</p>
                {data.main && (
                  <p>{(data.main.temp_max - 32).toFixed() * 0.5}°C</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <h1
            className={classes.extra_text}
            style={{
              textAlign: `center`,
              marginTop: `20px`,
              margin: `0px auto`,
              alignItems: `center`,
              justifyContent: `center`,
              width: `80%`,
              paddingTop: `100px`,
            }}
          >
            Feel Free to Search the World...
          </h1>
        )}
      </div>
    </>
  );
};

export default Hero;
