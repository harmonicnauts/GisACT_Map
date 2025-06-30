"use client"
import TopBar from '@/components/TopBar';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import("../components/Map"), {
  ssr: false
})



export default function Home() {
  return (
    <main>
      {/* <TopBar /> */}
      <MapClient />
    </main>
  );
}
