"use client";
import { useQueryState } from "nuqs";
import { parseAsJson } from "nuqs/server";
import { MapParamsSchema } from "@/lib/store/schema";

export const useMapParams = () => {
  const [params, setParams] = useQueryState("map", parseAsJson(MapParamsSchema.parse).withDefault(MapParamsSchema.parse({})));

  return {
    ...params,
    setPosition: (lat: number, lng: number) => setParams((prev) => ({ ...prev, lat, lng })),
    setZoom: (zoom: number) => setParams((prev) => ({ ...prev, zoom })),
    selectProperty: (id: string) => setParams((prev) => ({ ...prev, selectedId: id })),
    clearSelection: () => setParams((prev) => ({ ...prev, selectedId: undefined })),
  };
};
