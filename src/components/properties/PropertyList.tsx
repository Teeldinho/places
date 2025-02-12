import { type Property } from "@/lib/schema";
import PropertyCard from "@/components/properties/PropertyCard";

export default function PropertyList({ properties }: { properties: Property[] }) {
  const mapped = properties.filter((p) => p.status === "mapped");
  const unmapped = properties.filter((p) => p.status === "unmapped");

  return (
    <div className="w-80 h-screen p-4 border-r border-base-200">
      <div role="tablist" className="tabs tabs-boxed tabs-lg mb-4">
        <input
          type="radio"
          name="status-tabs"
          role="tab"
          className="tab flex-1"
          aria-label="Mapped"
          aria-controls="mapped-properties"
          defaultChecked
        />

        <div role="tabpanel" id="mapped-properties" className="tab-content pt-4" aria-labelledby="mapped-tab">
          <div className="flex flex-col gap-8">
            {mapped.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>

        <input type="radio" name="status-tabs" role="tab" className="tab flex-1" aria-label="Unmapped" aria-controls="unmapped-properties" />

        <div role="tabpanel" id="unmapped-properties" className="tab-content pt-4" aria-labelledby="unmapped-tab">
          <div className="flex flex-col gap-8">
            {unmapped.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
