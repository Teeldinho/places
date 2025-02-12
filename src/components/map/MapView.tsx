"use client";

import { Map, Marker, Popup, NavigationControl } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { type Property } from "@/lib/schema";
import { useMapParams } from "@/lib/store/client";
import Pin from "./Pin";

export default function MapView({ properties }: { properties: Property[] }) {
  const { lat, lng, zoom, selectedId, selectProperty, clearSelection } = useMapParams();

  return (
    <div className="h-screen w-full relative">
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <NavigationControl position="top-left" />

        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.coordinates.lng}
            latitude={property.coordinates.lat}
            onClick={() => (selectedId === property.id ? clearSelection() : selectProperty(property.id))}
          >
            <Pin property={property} isSelected={selectedId === property.id} />
          </Marker>
        ))}

        {selectedId && (
          <Popup
            longitude={properties.find((p) => p.id === selectedId)?.coordinates.lng || 0}
            latitude={properties.find((p) => p.id === selectedId)?.coordinates.lat || 0}
            anchor="bottom"
            onClose={clearSelection}
          >
            <div className="prose">
              <h3 className="text-sm font-bold">{properties.find((p) => p.id === selectedId)?.property}</h3>
              <p className="text-xs">{properties.find((p) => p.id === selectedId)?.subcommunity}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
