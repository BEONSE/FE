import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

const initialState = { rainForecast: "비예보가 없어요😆" };

const reducer = (state, action) => {
  switch (action.type) {
    case "Clear":
      return { rainForecast: "비예보가 없어요😆" };
      defalut: return state;
  }
};

const GetWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstDayForecast, setFirstDayForecast] = useState([]);
  const [secondDayForecast, setSecondDayForecast] = useState([]);
  const [thirdDayForecast, setThirdDayForecast] = useState([]);
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

      // 각 날짜별 예보를 분리하여 저장합니다.
      setFirstDayForecast(resForecast.data.list.slice(0, 8));
      setSecondDayForecast(resForecast.data.list.slice(8, 16));
      setThirdDayForecast(resForecast.data.list.slice(16, 24));
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

  // 최저, 최고 기온 구하는 함수
  const getTemperatureExtremes = (forecast) => {
    const temperatures = forecast.map((item) => item.main.temp);
    return {
      minTemp: Math.min(...temperatures),
      maxTemp: Math.max(...temperatures),
    };
  };

  // 맑은날, 구름낀 날만 있는지 계산하는 함수
  const getSkyState = (forecast) => {
    const skyStates = forecast.map((item) => item.weather[0].main);

    return skyStates.every((state) => state === "Clear" || state === "Clouds");
  };

  const renderForecast = (forecast) => {
    const { minTemp, maxTemp } = getTemperatureExtremes(forecast);
    const isClearOrCloudy = getSkyState(forecast);
    return (
      <>
        <p>최저 기온: {parseInt(minTemp)}°C</p>
        <p>최고 기온: {parseInt(maxTemp)}°C</p>
        {isClearOrCloudy ? "비예보가 없어요!😆" : "비예보가 있어요.."}
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <p>날씨 정보 불러오는 중...</p>
      ) : error ? (
        <p>날씨 정보를 불러오는데 실패😢</p>
      ) : (
        <>
          <CardView>
            <Card>
              <h3>첫째 날</h3>
              {renderForecast(firstDayForecast)}
            </Card>
            <Card>
              <h3>둘째 날</h3>
              {renderForecast(secondDayForecast)}
            </Card>
            <Card>
              <h3>셋째 날</h3>
              {renderForecast(thirdDayForecast)}
            </Card>
          </CardView>
        </>
      )}
    </>
  );
};

export default GetWeather;

//Styled Component
// 터치 스크롤 기능
const CardView = styled.div`
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 150px;
  height: 200px;
  margin-right: 10px;
  display: inline-block;
  background-color: skyblue;
`;
