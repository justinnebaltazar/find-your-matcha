import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// vancouver default location
const center = { lat: 49.2827, lng: -123.116226 };

function MatchaMap() {
  const [matchaPlaces, setMatchaPlaces] = useState([]);

  useEffect(() => {
    const fetchMatchaPlaces = async () => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: center,
        radius: 5000,
        keyword: "matcha",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setMatchaPlaces(results);
        }
      });
    };

    fetchMatchaPlaces();
  }, []);

  return (
    <LoadScript googleMapsApiKey="" libraries={["places"]}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {matchaPlaces.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MatchaMap;
