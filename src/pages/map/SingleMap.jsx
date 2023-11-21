import { useEffect } from "react";
import MarkerIcon from "../../assets/markerImg.png";

const { kakao } = window;

const SingleMap = ({ isLat, isLng, branchName }) => {
  useEffect(() => {
    const s_mapContainer = document.getElementById("siglemap"), // 지도 표시할 div
      s_mapOption = {
        center: new kakao.maps.LatLng(isLat, isLng), // 중심 좌표
        level: 4, //지도의 레벨(확대, 축소 정도)
      };

    const s_map = new kakao.maps.Map(s_mapContainer, s_mapOption); // 지도 생성

    // 마커 이미지
    const imageSrc = MarkerIcon, // 마커 이미지
      imageSize = new kakao.maps.Size(45, 75), // 마커이미지 크기
      imageOption = { offset: new kakao.maps.Point(23, 69) }; // 마커 이미지 옵션

    // 마커의 이미지 정보를 가지고 있는 마커 이미지를 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커 표시 위치
    const markerPosition = new kakao.maps.LatLng(isLat, isLng);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커 지도 위에 표시
    marker.setMap(s_map);

    const content =
      '<div class="customoverlay" style="background-color: white; border: 2px solid #35cfee; border-radius:30px;">' +
      '    <span class="title" style="padding:15px;">BEONSE ' +
      branchName +
      "</span>" +
      "</div>";

    const position = new kakao.maps.LatLng(isLat, isLng);

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      map: s_map,
      position: position,
      content: content,
      yAnchor: 3.7,
    });

    customOverlay.setMap(s_map);
  }, []);

  return <div id="siglemap" />;
};

export default SingleMap;
