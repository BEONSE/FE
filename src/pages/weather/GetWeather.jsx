import axios from "axios";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import SunnyImg from "../../assets/sunnyborder.png";
import RainyImg from "../../assets/rainyborder.png";
import Loading from "../../components/Loading";

const GetWeather = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [firstDayForecast, setFirstDayForecast] = useState([]); // 오늘 날씨 정보
  const [secondDayForecast, setSecondDayForecast] = useState([]); // 내일 날씨 정보
  const [thirdDayForecast, setThirdDayForecast] = useState([]); // 모레 날씨 정보
  const [error, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  // 캐러셀 스타일
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  const getWeatherForecast = async () => {
    try {
      // 위치를 못가져온 경우 defalut 위치
      let lat = 37.48077652077423;
      let lng = 126.88299356138995;

      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        });
      }

      const axios2 = axios.create({});

      const resForecast = await axios2.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`,
      );

      // 3일치 날짜 저장
      setFirstDayForecast(resForecast.data.list.slice(0, 8));
      setSecondDayForecast(resForecast.data.list.slice(8, 16));
      setThirdDayForecast(resForecast.data.list.slice(16, 24));
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWeatherForecast();
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

  // 날짜 포맷 변경 함수: 월/일 형식으로 변환
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  const renderForecast = (forecast, today) => {
    const { minTemp, maxTemp } = getTemperatureExtremes(forecast);
    const isClearOrCloudy = getSkyState(forecast);
    return (
      <>
        <WeatherInfo>
          {isClearOrCloudy ? (
            <WeatherImage src={SunnyImg} alt="Sun" />
          ) : (
            <WeatherImage src={RainyImg} alt="Rain" />
          )}

          <RainForecate>
            <DateDiv>
              <span>{today}</span>
              {forecast.length > 0 && <p>{formatDate(forecast[0].dt_txt)}</p>}
            </DateDiv>
            {isClearOrCloudy ? <p>비예보가 없어요!</p> : <p>비예보가 있어요..</p>}
            <TempInfo>
              <p>최저 {parseInt(minTemp)}°&nbsp;</p>
              <p>최고 {parseInt(maxTemp)}°</p>
            </TempInfo>
          </RainForecate>
        </WeatherInfo>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <WeatherLoad>
          <Loading />
          날씨 정보 불러오는 중...
        </WeatherLoad>
      ) : error ? (
        <WeatherLoad>날씨 정보를 불러오는데 실패 😢</WeatherLoad>
      ) : (
        <>
          <CardView>
            <Slider {...settings}>
              <Card>{renderForecast(firstDayForecast, "오늘은")}</Card>
              <Card>{renderForecast(secondDayForecast, "내일은")}</Card>
              <Card>{renderForecast(thirdDayForecast, "모레는")}</Card>
            </Slider>
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
  width: 101%;
  height: 25vh;
  margin: auto;
  white-space: nowrap;
  margin-bottom: 2vh;
  overflow-x: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  .slick-slide {
    padding-right: 2px;
  }
`;

const Card = styled.div`
  display: inline-block;
  border: 1px solid black;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  margin-bottom: 0.5vh;
  border-radius: 20px;
`;

// 날씨 정보 div
const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  font-size: 14px;
  margin-top: 1.5vh;
`;

// 날씨 이미지
const WeatherImage = styled.img`
  height: 11vh;
`;

// 날짜 div
const DateDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 17px;
  align-items: flex-end;
  margin-bottom: 1vh;

  & > span {
    font-size: 21px;
  }
`;

// 날씨 로드 div
const WeatherLoad = styled.p`
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
