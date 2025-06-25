"use client"
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import("../components/Map"), {
  ssr: false
})



export default function Home() {
  return (
    <main>
      <div>fjkdsalfjska</div>
      <MapClient />
    </main>
  );
}
