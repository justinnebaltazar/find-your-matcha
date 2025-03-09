import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import supabase from "../../helper/supabaseClient";
import styles from "./MatchaMap.module.css";

const containerStyle = { width: "100%", height: "400px"  };
const center = { lat: 49.2827, lng: -123.116226 };

function MatchaMap() {
  const [matchaPlaces, setMatchaPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch from Supabase
  useEffect(() => {
    const fetchSavedPlaces = async () => {
      const { data, error } = await supabase.from("matcha_places").select("*");
      if (error) console.error("Error fetching places:", error);
      else setMatchaPlaces(data);
    };
    fetchSavedPlaces();
  }, []);

  // fetch from Google Places API and save to Supabase
  const fetchFromGooglePlaces = async () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = { location: center, radius: 5000, keyword: "matcha" };

    service.nearbySearch(request, async (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setMatchaPlaces(results);

        for (const place of results) {
          const { error } = await supabase.from("matcha_places").upsert([
            {
              place_id: place.place_id,
              name: place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              address: place.vicinity,
            }
          ]);
          if (error) console.error("Error saving place:", error);
        }
      }
    });
  };

  // filter places by search input
  const filteredPlaces = matchaPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LoadScript googleMapsApiKey="GOOGLE_MAP_API_KEY" libraries={["places"]}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.buttonsContainer}>
            {/* search bar */}
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search matcha places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        
            {/* button to find new matcha places */}
            <button className={styles.findButton} onClick={fetchFromGooglePlaces}>Find Matcha Places</button>

          </div>
        {/* map */}
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {filteredPlaces.map((place) => (
            <Marker key={place.place_id} position={{ lat: place.latitude, lng: place.longitude }} />
          ))}
        </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default MatchaMap;
