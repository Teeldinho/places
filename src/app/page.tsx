import PropertyList from "@/components/properties/PropertyList";
import { dummyProperties } from "@/lib/data/properties";
import { mapParamsCache } from "@/lib/store/cache";
import type { SearchParams } from "nuqs/server";
import MapWrapper from "@/components/map/MapWrapper";
type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  // Parse the search params
  await mapParamsCache.parse(searchParams);

  return (
    <div className="drawer lg:drawer-open">
      <input id="property-drawer" type="checkbox" className="drawer-toggle" aria-label="Toggle property drawer" />

      {/* Property List Sidebar */}
      <div className="drawer-side h-screen z-20 px-4">
        <label htmlFor="property-drawer" className="drawer-overlay"></label>
        <PropertyList properties={dummyProperties} />
      </div>

      {/* Main Map View */}
      <div className="drawer-content">
        <MapWrapper properties={dummyProperties} />
      </div>
    </div>
  );
}
