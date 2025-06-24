"use client";

import { Icon, LatLngExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../data/dummy-data-for-test.json"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export default function MapClient() {
  const position: LatLngExpression = [-6.981560, 107.594185];
  const myIcon = new Icon({
    iconUrl: '@leaflet/dist/images/marker-icon.png',
    iconSize: [32,32]
  })

  return (
    <MapContainer
      center={position}
      zoom={17}
    //   scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geoJsonData.features.map((f) => f.geometry)}/>
    </MapContainer>
  );
}
