"use client";

import { LatLngExpression, Layer } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../data/dummy-data-for-test.json"
import { GeoJSONFeatureCollection } from "@/types/GeoJson";
import { Feature } from "geojson";
import { useState } from "react";

const light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const dark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';



export default function MapClient() {
//   const [mapStyle, setMapStyle] = useState<'light' | 'dark'>('light');


  function onEachFeature(feature:Feature, layer: Layer) {

    if (feature.properties) {
        const popupContent = Object.entries(feature.properties)
        .map(([key, value]) => `<b>${key}:</b> ${value}`)
        .join("<br/>");
        layer.bindPopup(popupContent)
    }
}


  const position: LatLngExpression = [-6.981560, 107.594185];
  return (
    <div>
        <MapContainer
            center={position}
            zoom={17}
            //   scrollWheelZoom={false}
            style={{ height: "100vh", width: "100%" }}
            >
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked={true} name="Light Mode">
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url={light} />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dark Mode">
                    <TileLayer attribution="&copy; OpenStreetMap contributors" url={dark} />
                </LayersControl.BaseLayer>

            </LayersControl>
            {/* <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url={mapStyle === 'light' ? light : dark}
                /> */}
            <GeoJSON 
            onEachFeature={onEachFeature} 
            data={geoJsonData as GeoJSONFeatureCollection}

            />
        </MapContainer>

    </div>
  );
}
