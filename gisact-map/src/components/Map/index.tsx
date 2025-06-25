"use client";

import { LatLngExpression, Layer, LeafletMouseEvent, PathOptions } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMap } from "react-leaflet";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../data/dummy-data-for-test.json"
import { GeoJSONFeatureCollection } from "@/types/GeoJson";
import { Feature, GeoJsonProperties, Geometry } from "geojson";
import { useEffect, useRef, useState } from "react";
import "leaflet-search";
import "leaflet-search/dist/leaflet-search.min.css";
// import Image from "next/image";

const light = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const dark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';


function SearchControl({ geoJsonLayer }: { geoJsonLayer: any }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !geoJsonLayer.current) return 

         const searchControl = new (window as any).L.Control.Search({
            layer: geoJsonLayer.current,
            propertyName: "Id",
            marker: false,
            moveToLocation: function (latlng: LatLngExpression, _title:string, map: L.Map) {
                map.setView(latlng, 18);
            },
        });

        map.addControl(searchControl);

        return () => {map.removeControl(searchControl)}
    }, [map, geoJsonLayer])
    return null
}


export default function MapClient() {
  const [mapStyle, setMapStyle] = useState<'light' | 'dark'>('light');
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null)

  const geoJsonRef = useRef<any>(null);


  function onEachFeature(feature:Feature, layer: Layer) {
    if (feature.properties) {
        const popupContent = Object.entries(feature.properties)
        .map(([key, value]) => `<b>${key}:</b> ${value}`)
        .join("<br/>");
        layer.bindPopup(popupContent)
    }

    const handleFeatureClick = (e: LeafletMouseEvent) => {
        if (!geoJsonRef.current) return;

        geoJsonRef.current.resetStyle();
        const layer = e.target;
        layer.setStyle({ color: "red" });
    };

    layer.on("click", (e: L.LeafletMouseEvent) => {
        if (!geoJsonRef.current) return;

        geoJsonRef.current.resetStyle(); 
        const clickedLayer = e.target;
        clickedLayer.setStyle({ color: "#3388ff" });
    });

    layer.on("popupclose", () => {
        if (!geoJsonRef.current) return;
        geoJsonRef.current.setStyle({ color: "#3388ff" });
    });

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
            key={selectedBuilding}
            onEachFeature={onEachFeature} 
            style={{ color: "#3388ff", weight: 2, fillOpacity: 0.6 }}
            data={geoJsonData as GeoJSONFeatureCollection}
            ref={geoJsonRef}
            />
            <SearchControl geoJsonLayer={geoJsonRef} />
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
