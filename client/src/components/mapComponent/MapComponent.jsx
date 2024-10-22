import React, { useEffect } from "react";
import L from "leaflet";
import "./mapComponent.scss";
import "leaflet-routing-machine"; // Import Routing Machine
import "leaflet/dist/leaflet.css";

const MapComponent = ({ enableRouting, destination }) => {
  useEffect(() => {
    const map = L.map("map").setView([27.6992, 85.3567], 13); // Default center

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add routing if enabled
    if (enableRouting && destination) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        L.Routing.control({
          waypoints: [
            L.latLng(latitude, longitude), // User's current location
            L.latLng(destination.latitude, destination.longitude), // Destination
          ],
          routeWhileDragging: true, // Allows dragging route
          lineOptions: {
            styles: [
              { color: "blue", weight: 6 }, // Custom color and width for route highlight
            ],
          },
        }).addTo(map);
      });
    }

    return () => {
      map.remove(); // Clean up map instance on component unmount
    };
  }, [enableRouting, destination]);

  return (
    <div>
      <div id="map" className="map-container small"></div>
    </div>
  );
};

export default MapComponent;
