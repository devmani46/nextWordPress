"use client";
import { useState } from "react";
import { motion } from "motion/react";
// @ts-ignore
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const markers = [
    { name: "Nepal", coordinates: [84.124, 28.3949] },
    { name: "India", coordinates: [78.9629, 20.5937] },
    { name: "Bhutan", coordinates: [90.4336, 27.5142] },
    { name: "United Arab Emirates", coordinates: [53.8478, 23.4241] },
    { name: "Qatar", coordinates: [51.1839, 25.3548] },
    { name: "Saudi Arabia", coordinates: [45.0792, 23.8859] },
    { name: "United States", coordinates: [-95.7129, 37.0902] },
    { name: "United Kingdom", coordinates: [-3.436, 55.3781] },
    { name: "Australia", coordinates: [133.7751, -25.2744] },
    { name: "Japan", coordinates: [138.2529, 36.2048] },
    { name: "South Korea", coordinates: [127.7669, 35.9078] },
    { name: "Malaysia", coordinates: [101.9758, 4.2105] },
    { name: "Singapore", coordinates: [103.8198, 1.3521] },
    { name: "Italy", coordinates: [12.5674, 41.8719] },
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
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#8AA9DFFF"
                stroke="#3F5E8AFF"
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
            {/* Text with background */}
            {hovered === m.name && (
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ transformOrigin: "center" }}
              >
                {/* Background rectangle */}
                {/* <rect
                  x={-90} // half width to center
                  y={-55} // above marker
                  width={200}
                  height={30}
                  rx={4} // rounded corners
                  fill="white"
                  stroke="#ccc"
                  strokeWidth={0.5}
                /> */}
                {/* Text on top of rect */}
                <text
                  y={-30} // center vertically in rect
                  textAnchor="middle"
                  className="fill-white-light text-xs font-bold"
                  style={{
                    fontSize: "1.5rem",
                    textShadow: "10px 10px 10px 10px black",
                  }}
                >
                  {m.name}
                </text>
              </motion.g>
            )}

            <circle r={10} fill="#fff" stroke="#fff" className="animate-ping" />

            <motion.circle
              r={5}
              fill="#fff"
              stroke="#fff"
              animate={{
                scale: hovered === m.name ? 2 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* {hovered && (
        <div className="absolute bottom-4 rounded bg-white px-3 py-1 text-sm text-black shadow">
          {hovered}
        </div>
      )} */}
    </div>
  );
}
