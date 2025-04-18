import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type LayoffMapProps = {
  data: Array<{
    company: string;
    city: string;
    laidOff: number;
  }>;
};

const LayoffMap: React.FC<LayoffMapProps> = ({ data }) => {
  const [cityCoordinates, setCityCoordinates] = useState<
    Array<{ city: string; lat: number; lng: number }>
  >([]);

  // Fetch cities.json dynamically
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/data/cities.json");
        const cities = await response.json();
        setCityCoordinates(cities);
      } catch (error) {
        console.error("Error fetching cities.json:", error);
      }
    };

    fetchCities();
  }, []);

  // Match cities to coordinates
  const dataWithCoordinates = data.map((item) => {
    const cityData = cityCoordinates.find(
      (c) => c.city.toLowerCase() === item.city.toLowerCase()
    );
    return {
      ...item,
      coordinates: cityData
        ? [cityData.lat, cityData.lng]
        : [37.7749, -122.4194], // Default to San Francisco if no match
    };
  });

  return (
    <div className="w-full h-96 mb-8">
      <MapContainer center={[37.7749, -122.4194]} zoom={4} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {dataWithCoordinates.map((item, index) => (
          <Marker key={index} position={item.coordinates}>
            <Popup>
              <strong>{item.company}</strong>
              <br />
              Layoffs: {item.laidOff.toLocaleString()}
              <br />
              City: {item.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LayoffMap;