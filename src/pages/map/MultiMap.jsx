import { useEffect, useState } from "react";
import MarkerIcon from "../../assets/markerImg.png";
import { useNavigate } from "react-router-dom";
import { ReqBranchPosition } from "../../apis/branch";
const { kakao } = window;

const MultiMap = () => {
  const navigate = useNavigate();
  const [isPosition, setIsPosition] = useState([]);

  useEffect(() => {
    async function getBranchPosition() {
      try {
        const positionResponse = await ReqBranchPosition();
        console.log(positionResponse);
        if (positionResponse.status === 200) {
          setIsPosition(positionResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBranchPosition();
  }, []);

  // 지도 띄우기
  useEffect(() => {
    const m_mapContainer = document.getElementById("multimap"),
      m_mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
        level: 5, //지도의 레벨(확대, 축소 정도)
      };

    const m_map = new kakao.maps.Map(m_mapContainer, m_mapOption);

    // 여러개 마커
    const positions = isPosition.map((item) => ({
      title: `BEONSE ${item.name}`,
      latlng: new kakao.maps.LatLng(item.lat, item.lng),
    }));

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

      // 커스텀 오버레이를 생성
      var customOverlay = new kakao.maps.CustomOverlay({
        map: null,
        position: positions[i].latlng,
        content: content,
        yAnchor: 3.5,
      });

      customOverlay.setMap(m_map);
      (function (m_marker, customOverlay) {
        kakao.maps.event.addListener(m_marker, "click", function () {
          navigate("/destination-path"); // 마커 클릭
        });
      })(m_marker, customOverlay);
    }

    const displayMarker = (locPosition) => {
      let marker = new kakao.maps.Marker({
        map: m_map,
        position: locPosition,
      });

      bounds.extend(locPosition);
      m_map.setBounds(bounds);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치 가져오기 성공 시 처리
          let lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
            
          let locPosition = new kakao.maps.LatLng(lat, lon);

          displayMarker(locPosition);
        },
        (error) => {
          // 에러 처리
          alert("현재 위치 못가져옴");
          m_map.setCenter(positions[4].latlng);
        },
        {
          timeout: 5000, // 5초 후 타임아웃
          maximumAge: 60000, // 위치 캐시의 최대 수명
          enableHighAccuracy: true, // 정확한 위치 정보 사용
        },
      );
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "현재 위치를 불러올 수 없습니다...";

      displayMarker(locPosition, message);
    }
  }, [isPosition, setIsPosition]);

  return <div id="multimap" />;
};

export default MultiMap;
