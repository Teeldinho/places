import { createSearchParamsCache, parseAsJson } from "nuqs/server";
import { MapParamsSchema, SortParamsSchema } from "@/lib/schema";

export const mapParamsCache = createSearchParamsCache({
  map: parseAsJson(MapParamsSchema.parse),
  sort: parseAsJson(SortParamsSchema.parse),
});
