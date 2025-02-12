"use client";
import { useQueryState } from "nuqs";
import { parseAsJson } from "nuqs/server";
import { MapParamsSchema, SortParamsSchema } from "@/lib/schema";

export const useMapParams = () => {
  const [params, setParams] = useQueryState("map", parseAsJson(MapParamsSchema.parse).withDefault(MapParamsSchema.parse({})));
  const [sort, setSort] = useQueryState("sort", parseAsJson(SortParamsSchema.parse).withDefault(SortParamsSchema.parse({})));

  return {
    ...params,
    sort,
    setSortField: (field: "property" | "community" | "subcommunity") => setSort((prev) => ({ ...prev, field })),
    setSortDirection: (direction: "asc" | "desc") => setSort((prev) => ({ ...prev, direction })),
    setPosition: (lat: number, lng: number) => setParams((prev) => ({ ...prev, lat, lng })),
    setZoom: (zoom: number) => setParams((prev) => ({ ...prev, zoom })),
    selectProperty: (id: string) => setParams((prev) => ({ ...prev, selectedId: id })),
    clearSelection: () => setParams((prev) => ({ ...prev, selectedId: undefined })),
  };
};
