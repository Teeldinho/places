import * as turf from "@turf/turf";

export const DEFAULT_LAT = 25.2048; // Dubai
export const DEFAULT_LNG = 55.2708; // Dubai
export const DEFAULT_ZOOM = 14; // 14 is the default zoom level for the map
export const PROPERTY_ZOOM = 18; // Zoom level when focusing on a property
export const AREA_GEOFENCE = turf.circle([DEFAULT_LNG, DEFAULT_LAT], 4.5, { units: "kilometers" }); // restrict to a radius

// Bounds of the geofence
export const GEOFENCE_BOUNDS = turf.bbox(AREA_GEOFENCE);
export const MIN_LNG = GEOFENCE_BOUNDS[0]; // Minimum longitude
export const MAX_LNG = GEOFENCE_BOUNDS[2]; // Maximum longitude
export const MIN_LAT = GEOFENCE_BOUNDS[1]; // Minimum latitude
export const MAX_LAT = GEOFENCE_BOUNDS[3]; // Maximum latitude

export function isWithinGeofence(lng: number, lat: number): boolean {
  const point = turf.point([lng, lat]);
  return turf.booleanPointInPolygon(point, AREA_GEOFENCE);
}

export function getGeofenceBounds() {
  return turf.bbox(AREA_GEOFENCE);
}
