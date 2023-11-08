import { useEffect } from "react";
import styled from "styled-components";
import MarkerIcon from "../../assets/markerImg.png";

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map"), // 지도 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

    // 마커 이미지
    const imageSrc = MarkerIcon, // 마커 이미지
      imageSize = new kakao.maps.Size(45, 75), // 마커이미지 크기
      imageOption = { offset: new kakao.maps.Point(23, 69) }; // 마커 이미지 옵션

    // 마커의 이미지 정보를 가지고 있는 마커 이미지를 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커 표시 위치
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커 지도 위에 표시
    marker.setMap(map);

    const content =
      '<div class="customoverlay" style="background-color: white; border: 2px solid #35cfee; border-radius:30px;">' +
      '    <span class="title" style="padding:15px;">BEONSE 가산디지털단지점</span>' +
      "</div>";

    const position = new kakao.maps.LatLng(33.450701, 126.570667);

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      yAnchor: 3.7,
    });
  }, []);

  return <MapDiv id="map" />;
};

export default Map;

/* 지도 Style */
const MapDiv = styled.div`
  width: 100%;
  height: 100%;
`;
