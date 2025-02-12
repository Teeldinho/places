import { z } from "zod";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM, isWithinGeofence, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG } from "@/lib/geofence";

export const MapParamsSchema = z.object({
  lat: z.number().min(MIN_LAT).max(MAX_LAT).default(DEFAULT_LAT),
  lng: z.number().min(MIN_LNG).max(MAX_LNG).default(DEFAULT_LNG),
  zoom: z.number().min(1).max(30).default(DEFAULT_ZOOM),
  selectedId: z.string().uuid().optional(),
  activeTab: z.enum(["mapped", "unmapped"]).default("mapped"),
});

export type MapParams = z.infer<typeof MapParamsSchema>;

export const PropertySchema = z.object({
  id: z.string().uuid(),
  city: z.enum(["Dubai"]).optional(),
  community: z.string().min(2).optional(),
  subcommunity: z.string().min(2).optional(),
  property: z.string().min(2).optional(),
  description: z.string().min(2).optional(),
  coordinates: z.object({
    lat: z.number().min(MIN_LAT).max(MAX_LAT),
    lng: z.number().min(MIN_LNG).max(MAX_LNG),
  }),
  isMapped: z.boolean().default(false),
  image: z.string().url().default("https://placehold.co/600x400").optional(),
  lastUpdated: z.date().default(new Date()).optional(),
});

export type Property = z.infer<typeof PropertySchema>;

export const AddPropertySchema = PropertySchema.pick({
  property: true,
  coordinates: true,
  isMapped: true,
}).refine((data) => isWithinGeofence(data.coordinates.lng, data.coordinates.lat), {
  message: `Coordinates must be within Dubai area (Lat: ${MIN_LAT.toFixed(4)}-${MAX_LAT.toFixed(4)}, Lng: ${MIN_LNG.toFixed(4)}-${MAX_LNG.toFixed(
    4
  )})`,
  path: ["coordinates"],
});

export type AddPropertyData = z.infer<typeof AddPropertySchema>;

export const EditPropertySchema = PropertySchema.pick({
  property: true,
  coordinates: true,
  isMapped: true,
})
  .extend({ id: z.string().uuid() })
  .refine((data) => isWithinGeofence(data.coordinates.lng, data.coordinates.lat), {
    message: `Coordinates must be within Dubai area (Lat: ${MIN_LAT.toFixed(4)}-${MAX_LAT.toFixed(4)}, Lng: ${MIN_LNG.toFixed(4)}-${MAX_LNG.toFixed(
      4
    )})`,
    path: ["coordinates"],
  });

export type EditPropertyData = z.infer<typeof EditPropertySchema>;
