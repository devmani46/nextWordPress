"use client";
import { useState } from "react";
// @ts-ignore
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  const [hovered, setHovered] = useState(null);

  const markers = [
    { name: "Japan", coordinates: [138.2529, 36.2048] },
    { name: "United States", coordinates: [-95.7129, 37.0902] },
    { name: "Australia", coordinates: [133.7751, -25.2744] },
    { name: "United Kingdom", coordinates: [-3.436, 55.3781] },
  ];

  return (
    <div className="relative flex justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150,
          center: [0, 30], // [longitude, latitude] center
          // Optional: restrict latitude to avoid pole stretching
          clipAngle: 90,
        }}
        width={1200}
        height={600}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#AFC0DD"
                stroke="#94A3B8"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {markers.map((m) => (
          <Marker
            key={m.name}
            coordinates={m.coordinates}
            onMouseEnter={() => setHovered(m.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
          </Marker>
        ))}
      </ComposableMap>

      {hovered && (
        <div className="absolute bottom-4 rounded bg-white px-3 py-1 text-sm shadow">
          {hovered}
        </div>
      )}
    </div>
  );
}
