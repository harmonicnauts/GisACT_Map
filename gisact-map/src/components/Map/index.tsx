"use client";

import { LatLngExpression, Layer } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../data/dummy-data-for-test.json"
import { GeoJSONFeatureCollection } from "@/types/GeoJson";
import { Feature } from "geojson";
import { useState } from "react";
import Image from "next/image";

const light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const dark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';



export default function MapClient() {
  const [mapStyle, setMapStyle] = useState<'light' | 'dark'>('light');


  function onEachFeature(feature:Feature, layer: Layer) {

    if (feature.properties) {
        const popupContent = Object.entries(feature.properties)
        .map(([key, value]) => `<b>${key}:</b> ${value}`)
        .join("<br/>");
        layer.bindPopup(popupContent)
        }
    }

    const toggleMapStyle = () => {
        setMapStyle(prev => prev === "light" ? "dark" : "light")
    }


  const position: LatLngExpression = [-6.981560, 107.594185];
  return (
    <div style={{ position: "relative" }}>
        <MapContainer
            center={position}
            zoom={17}
            //   scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
            >
                <TileLayer 
                    attribution="&copy; OpenStreetMap contributors"
                    url={mapStyle === "light" ? light : dark}
                >

                </TileLayer>
            {/* <LayersControl position="topright">
                <LayersControl.BaseLayer checked={true} name="Light Mode">
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url={light} />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dark Mode">
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url={dark} />
                </LayersControl.BaseLayer>

            </LayersControl> */}
            {/* <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url={mapStyle === 'light' ? light : dark}
                /> */}
            <GeoJSON 
            onEachFeature={onEachFeature} 
            data={geoJsonData as GeoJSONFeatureCollection}

            />
        </MapContainer>
        <button
            onClick={toggleMapStyle}
            style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            zIndex: 1000
            }}
            title="Toggle Map Style"
        >
            {
                mapStyle === "dark" ? <IoIosSunny color="#000" width={24} height={24}/> : <FaMoon color="#000" width={24} height={24}/>
            }
      </button>

    </div>
  );
}
