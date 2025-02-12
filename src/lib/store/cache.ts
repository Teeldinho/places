import { createSearchParamsCache, parseAsJson } from "nuqs/server";
import { MapParamsSchema } from "@/lib/store/schema";

export const mapParamsCache = createSearchParamsCache({
  map: parseAsJson(MapParamsSchema.parse),
});
