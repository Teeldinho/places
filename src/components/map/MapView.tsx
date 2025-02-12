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
import AddPropertyButton from "./AddPropertyButton";
import { isWithinGeofence } from "@/lib/geofence";

export default function MapView({ properties }: { properties: Property[] }) {
  const { lat, lng, zoom, selectedId, selectProperty, clearSelection, query } = useMapParams();
  const [map, setMap] = useState<maplibregl.Map | null>(null);

  const { mappedProperties } = useProperties(properties, undefined, query);
  const selectedProperty = mappedProperties.find((p) => p.id === selectedId);

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
        onClick={(e) => {
          const { lng, lat } = e.lngLat;
          if (!isWithinGeofence(lng, lat)) {
            alert("Please select location within Dubai area");
            return;
          }
        }}
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {mappedProperties.map((property) => (
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

        {selectedProperty?.isMapped && (
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

        <div className="absolute top-6 left-16 z-10">
          <AddPropertyButton />
        </div>
      </Map>
    </div>
  );
}
