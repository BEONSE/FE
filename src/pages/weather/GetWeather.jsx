import axios from "axios";
import styled from "styled-components";

import { useEffect, useState } from "react";
import SunnyImg from "../../assets/sunnyborder.png";
import RainyImg from "../../assets/rainyborder.png";

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

    // 날짜 포맷 변경 함수: 월/일 형식으로 변환
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      });
    };

    return (
      <>
        <WeatherInfo>
          {isClearOrCloudy ? (
            <WeatherImage src={SunnyImg} alt="Sun" />
          ) : (
            <WeatherImage src={RainyImg} alt="Rain" />
          )}

          <RainForecate>
            <DateDiv>{forecast.length > 0 && <p>{formatDate(forecast[0].dt_txt)}</p>}</DateDiv>
            {isClearOrCloudy ? <p>비예보가 없어요!</p> : <p>비예보가 있어요..</p>}
            <TempInfo>
              <p>최저 {parseInt(minTemp)}°C &nbsp;</p>
              <p>최고 {parseInt(maxTemp)}°C</p>
            </TempInfo>
          </RainForecate>
        </WeatherInfo>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <p>날씨 정보 불러오는 중...</p>
      ) : error ? (
        <p>날씨 정보를 불러오는데 실패 😢</p>
      ) : (
        <>
          <CardView>
            <Card>{renderForecast(firstDayForecast)}</Card>
            <Card>{renderForecast(secondDayForecast)}</Card>
            <Card>{renderForecast(thirdDayForecast)}</Card>
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
  width: 90vw;
  margin: auto;
  white-space: nowrap;
  margin-bottom: 2vh;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 2vh;
  display: inline-block;
  border: 1px solid black;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  border-radius: 20px;
`;

// 날씨 정보 div
const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2vw;
  & > div {
    display: flex;
  }
`;

// 비예보 정보 div
const RainForecate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > p {
    font-size: 20px;
    font-weight: bold;
  }
`;

// 기온 정보 div
const TempInfo = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 1.5vh;
`;

// 날씨 이미지
const WeatherImage = styled.img`
  height: 10vh;
`;

// 날짜 div
const DateDiv = styled.div`
  font-weight: bold;
  font-size: 17px;
  align-items: flex-end;
  margin-bottom: 1vh;
`;
