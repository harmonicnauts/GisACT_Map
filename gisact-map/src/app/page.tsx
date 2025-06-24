"use client"

import { LatLngExpression } from "leaflet";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const MapClient = dynamic(() => import("../components/Map"), {
  ssr: false
})

export default function Home() {
  return (
    <main>
      <MapClient />
    </main>

  );
}
