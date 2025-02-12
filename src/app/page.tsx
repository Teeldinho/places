import PropertyList from "@/components/properties/PropertyList";
import { mapParamsCache } from "@/lib/store/cache";
import type { SearchParams } from "nuqs/server";
import MapWrapper from "@/components/map/MapWrapper";
import { getAllProperties } from "@/lib/queries/property-queries";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  // Parse the search params
  await mapParamsCache.parse(searchParams);

  const properties = await getAllProperties();

  console.log("properties = ", properties);

  return (
    <div className="drawer lg:drawer-open">
      <input id="property-drawer" type="checkbox" className="drawer-toggle" aria-label="Toggle property drawer" />

      {/* Property List Sidebar */}
      <div className="drawer-side h-screen z-20 px-4">
        <label htmlFor="property-drawer" className="drawer-overlay"></label>
        <PropertyList properties={properties} />
      </div>

      {/* Main Map View */}
      <div className="drawer-content">
        <MapWrapper properties={properties} />
      </div>
    </div>
  );
}
