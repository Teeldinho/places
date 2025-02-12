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

  return (
    <div className="drawer lg:drawer-open">
      <input id="property-drawer" type="checkbox" className="drawer-toggle" aria-label="Toggle property drawer" />

      {/* Mobile menu button */}
      <label htmlFor="property-drawer" className="btn btn-circle btn-block swap swap-rotate lg:hidden absolute top-6 left-3 z-50 max-w-fit">
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/200/svg" width="32" height="32" viewBox="0 0 512 512">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>

      {/* Sidebar */}
      <div className="drawer-side h-screen z-40">
        <label htmlFor="property-drawer" className="drawer-overlay"></label>
        <PropertyList properties={properties} />
      </div>

      {/* Main content */}
      <div className="drawer-content">
        <MapWrapper properties={properties} />
      </div>
    </div>
  );
}
