import axios from "axios";
import { useEffect, useState } from "react";

const GetWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const lat = 37.48077652077423;
  const lng = 126.88299356138995;

  const getWeatherForecast = async (lat, lng) => {
    try {
      const resForecast = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`,
      );

      console.log(resForecast);

      // 3일치 예보만 필터링합니다.
      const threeDayForecast = resForecast.data.list.filter((item, index) => index < (24 / 3) * 3);
      setForecast(threeDayForecast);
    } catch (error) {
      console.error("Forecast fetching error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeatherForecast(lat, lng);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>날씨 정보 불러오는 중...</p>
      ) : error ? (
        <p>날씨 정보를 불러오는데 실패😢</p>
      ) : (
        <div>
          <h2>3일간의 날씨 예보</h2>
          {forecast.map((item, index) => (
            <div key={index}>
              <p>-----------------------</p>
              <p>시간: {item.dt_txt}</p>
              <p>온도: {item.main.temp}°C</p>
              <p>날씨: {item.weather[0].main}</p>
              <p>상세: {item.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="날씨 아이콘"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetWeather;
