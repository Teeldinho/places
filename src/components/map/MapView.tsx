"use client";

import { useEffect, useState } from "react";
import { FullscreenControl, Map, Marker, NavigationControl, ScaleControl, Popup } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { type Property } from "@/lib/schema";
import { useMapParams } from "@/lib/store/client";
import Pin from "@/components/map/Pin";
import PropertyCard from "@/components/properties/PropertyCard";
import { useProperties } from "@/lib/hooks/useProperties";
import { useMapNavigation } from "@/lib/hooks/useMapNavigation";
import ResetButton from "@/components/map/ResetButton";

export default function MapView({ properties }: { properties: Property[] }) {
  const { lat, lng, zoom, selectedId, selectProperty, clearSelection } = useMapParams();
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const { getPropertyById } = useProperties(properties);
  const selectedProperty = getPropertyById(selectedId || "");

  const { focusProperty } = useMapNavigation();

  useEffect(() => {
    if (selectedProperty && map) {
      focusProperty(selectedProperty);
    }
  }, [focusProperty, selectedProperty, map]);

  return (
    <div className="h-screen w-full relative">
      <Map
        onLoad={(e) => {
          setMap(e.target);
          e.target.flyTo({
            center: [lng, lat],
            zoom,
          });
        }}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.coordinates.lng}
            latitude={property.coordinates.lat}
            onClick={(e) => {
              e.originalEvent?.stopPropagation();
              selectProperty(property.id);
              focusProperty(property);
            }}
          >
            <Pin isSelected={selectedId === property.id} />
          </Marker>
        ))}

        {selectedProperty && (
          <Popup
            anchor="bottom"
            offset={10}
            longitude={selectedProperty.coordinates.lng}
            latitude={selectedProperty.coordinates.lat}
            onClose={clearSelection}
            closeOnClick={false}
          >
            <PropertyCard property={selectedProperty} isSelected={true} onClose={clearSelection} />
          </Popup>
        )}

        <div className="absolute top-2 right-2 z-10">
          <ResetButton />
        </div>
      </Map>
    </div>
  );
}
