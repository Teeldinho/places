"use client";
import dynamic from "next/dynamic";
import { type Property } from "@/lib/schema";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-base-200">
      <span className="loading loading-dots loading-lg" />
    </div>
  ),
});

export default function MapWrapper({ properties }: { properties: Property[] }) {
  return <MapView properties={properties} />;
}
