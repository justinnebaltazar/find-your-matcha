import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import supabase from "../../helper/supabaseClient";
import styles from "./MatchaMap.module.css";

// Set Mapbox Access Token
mapboxgl.accessToken = "pk.eyJ1IjoianVzdGlubmViIiwiYSI6ImNtODFocGo3NjE0eWwyd3EzYXRpY2h1bmQifQ.r5PGdaSEWlCd0Tj62FRw9Q";

const center = [-123.116226, 49.2827]; // [longitude, latitude]

function MatchaMap() {
  const [matchaPlaces, setMatchaPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); // Store markers for cleanup

  // Initialize Map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl());
  }, []);

  // Fetch matcha places from Supabase
  const fetchSavedPlaces = async () => {
    const { data, error } = await supabase.from("matcha_places").select("*");
    if (error) console.error("Error fetching places:", error);
    else setMatchaPlaces(data);
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  // Add markers to the map
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add new markers
    matchaPlaces.forEach((place) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new mapboxgl.Popup().setText(place.name))
        .addTo(map.current);
      markers.current.push(marker);
    });
  }, [matchaPlaces]);

  // Search for matcha places using Mapbox Geocoding API
  const searchMatchaPlaces = async () => {
    if (!searchQuery) return;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?proximity=${center[0]},${center[1]}&access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const features = data.features;

      if (features.length) {
        const newCenter = features[0].center;
        map.current.flyTo({ center: newCenter, zoom: 14 });

        // Clear existing markers
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];

        // Add new marker
        const marker = new mapboxgl.Marker()
          .setLngLat(newCenter)
          .setPopup(new mapboxgl.Popup().setText(features[0].place_name))
          .addTo(map.current);
        markers.current.push(marker);
      }
    } catch (error) {
      console.error("Error searching places:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* search bar */}
      <div className={styles.buttonsContainer}>
        <input className={styles.searchBar}
          type="text"
          placeholder="Search matcha places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

        />
        <button className={styles.findButton} onClick={searchMatchaPlaces}>
          Search
        </button>
      </div>

      {/* map container */}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
}

export default MatchaMap;