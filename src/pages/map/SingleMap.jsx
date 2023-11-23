import { useEffect, useState } from "react";
import MarkerIcon from "../../assets/markerImg.png";
import Loading from "../../components/Loading";

const { kakao } = window;

const SingleMap = ({ isLat, isLng, branchName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMap = async () => {
      const s_mapContainer = document.getElementById("siglemap");
      const s_mapOption = {
        center: new kakao.maps.LatLng(isLat, isLng),
        level: 5,
      };

      const s_map = new kakao.maps.Map(s_mapContainer, s_mapOption);
      setMap(s_map);
    };

    loadMap();
  }, [isLat, isLng]);

  useEffect(() => {
    if (!isLoading && map) {
      const imageSrc = MarkerIcon,
        imageSize = new kakao.maps.Size(45, 75),
        imageOption = { offset: new kakao.maps.Point(23, 69) };

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const markerPosition = new kakao.maps.LatLng(isLat, isLng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        map: map,
      });

      const content =
        '<div class="customoverlay" style="background-color: white; border: 2px solid #35cfee; border-radius:30px;">' +
        '    <span class="title" style="padding:15px;">BEONSE ' +
        branchName +
        "</span>" +
        "</div>";

      const position = new kakao.maps.LatLng(isLat, isLng);

      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: position,
        content: content,
        yAnchor: 3.7,
      });

      customOverlay.setMap(map);
    }
  }, [isLoading, map, isLat, isLng, branchName]);

  useEffect(() => {
    if (map) {
      setIsLoading(false);
    }
  }, [map]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return <div id="siglemap" style={{ width: "500px", height: "400px" }} />;
};

export default SingleMap;
