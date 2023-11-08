import { useEffect } from "react";
import MarkerIcon from "../../assets/markerImg.png";
import { useNavigate } from "react-router-dom";
const { kakao } = window;
const MultiMap = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const m_mapContainer = document.getElementById("multimap"),
      m_mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
        level: 10, //지도의 레벨(확대, 축소 정도)
      };

    const m_map = new kakao.maps.Map(m_mapContainer, m_mapOption);

    // 여러개 마커
    var positions = [
      {
        title: "카카오",
        latlng: new kakao.maps.LatLng(36.450705, 126.670677),
      },
      {
        title: "생태연못",
        latlng: new kakao.maps.LatLng(36.450936, 126.69477),
      },
      {
        title: "텃밭",
        latlng: new kakao.maps.LatLng(36.450879, 127.56884),
      },
      {
        title: "근린공원",
        latlng: new kakao.maps.LatLng(36.451393, 126.570738),
      },
      {
        title: "가람이집",
        latlng: new kakao.maps.LatLng(37.451393, 128.570738),
      },
    ];

    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    const bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지
      const imageSrc = MarkerIcon, // 마커 이미지
        imageSize = new kakao.maps.Size(45, 75), // 마커이미지 크기
        imageOption = { offset: new kakao.maps.Point(23, 69) }; // 마커 이미지 옵션

      // 마커의 이미지 정보를 가지고 있는 마커 이미지를 생성
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      // 마커 생성
      const m_marker = new kakao.maps.Marker({
        map: m_map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage,
      });

      m_marker.setMap(m_map);

      bounds.extend(positions[i].latlng);

      const content =
        '<div class="customoverlay" style="background-color: white; border: 2px solid #35cfee; border-radius:30px;">' +
        '    <span class="title" style="padding:15px;">' +
        positions[i].title +
        "</span>" +
        "</div>";

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: null,
        position: positions[i].latlng,
        content: content,
        yAnchor: 3.5,
      });

      (function (m_marker, customOverlay) {
        kakao.maps.event.addListener(m_marker, "click", function () {
          navigate("/destination-path");
        });

        kakao.maps.event.addListener(m_marker, "mouseover", function () {
          customOverlay.setMap(m_map); // 오버레이를 지도에 표시
        });

        kakao.maps.event.addListener(m_marker, "mouseout", function () {
          customOverlay.setMap(null); // 오버레이를 제거
        });
      })(m_marker, customOverlay);
    }

    const displayMarker = (locPosition, message) => {
      let marker = new kakao.maps.Marker({
        map: m_map,
        position: locPosition,
      });

      let iwContent = message,
        iwRemovable = true;

      var infoWindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemovable,
      });
      bounds.extend(locPosition);

      infoWindow.open(m_map, marker);

      m_map.setBounds(bounds);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px; font-size:16px;">📍 현 재 위 치 📍 </div>';

        displayMarker(locPosition, message);
      });
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "현재 위치를 불러올 수 없습니다...";

      displayMarker(locPosition, message);
    }
  }, [navigate]);

  return <div id="multimap" />;
};

export default MultiMap;
