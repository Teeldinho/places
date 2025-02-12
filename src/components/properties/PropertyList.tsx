"use client";

import { type Property } from "@/lib/schema";
import PropertyCard from "@/components/properties/PropertyCard";
import { useMapParams } from "@/lib/store/client";
import { useProperties } from "@/lib/hooks/useProperties";
import { useMapNavigation } from "@/lib/hooks/useMapNavigation";

export default function PropertyList({ properties }: { properties: Property[] }) {
  const { mappedProperties, unmappedProperties } = useProperties(properties);
  const { selectedId, selectProperty, clearSelection } = useMapParams();
  const { focusProperty } = useMapNavigation();

  return (
    <div className="w-[35vw] h-screen p-4 border-r border-base-200">
      <div role="tablist" className="tabs tabs-boxed tabs-lg mb-4">
        <input
          type="radio"
          name="status-tabs"
          role="tab"
          className="tab flex-1"
          aria-label="Mapped"
          aria-controls="mapped-properties"
          defaultChecked
          onClick={() => clearSelection()}
        />

        <div role="tabpanel" id="mapped-properties" className="tab-content pt-4" aria-labelledby="mapped-tab">
          <div data-tab="Mapped" className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {mappedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={selectedId === property.id}
                onClick={() => {
                  selectProperty(property.id);
                  focusProperty(property);
                }}
              />
            ))}
          </div>
        </div>

        <input type="radio" name="status-tabs" role="tab" className="tab flex-1" aria-label="Unmapped" aria-controls="unmapped-properties" />

        <div role="tabpanel" id="unmapped-properties" className="tab-content pt-4" aria-labelledby="unmapped-tab">
          <div data-tab="Mapped" className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {unmappedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={selectedId === property.id}
                onClick={() => {
                  selectProperty(property.id);
                  focusProperty(property);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
