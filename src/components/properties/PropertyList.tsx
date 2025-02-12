"use client";

import { type Property } from "@/lib/schema";
import PropertyCard from "@/components/properties/PropertyCard";
import { useMapParams } from "@/lib/store/client";
import { useProperties } from "@/lib/hooks/useProperties";
import { useMapNavigation } from "@/lib/hooks/useMapNavigation";
import { useState } from "react";
import SortDropdown from "@/components/properties/SortDropdown";
import SearchInput from "@/components/properties/SearchInput";

export default function PropertyList({ properties }: { properties: Property[] }) {
  const { sort, query } = useMapParams();
  const { mappedProperties, unmappedProperties } = useProperties(properties, sort, query);

  const { selectedId, selectProperty, clearSelection } = useMapParams();
  const { focusProperty } = useMapNavigation();

  const [activeTab, setActiveTab] = useState<"mapped" | "unmapped">("mapped");

  return (
    <div className="w-[35vw] h-screen p-4 border-r border-base-200 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="tabs tabs-box tabs-lg w-full">
            <input
              type="radio"
              name="property-tabs"
              id="mapped-tab"
              className="tab flex-1 w-full"
              checked={activeTab === "mapped"}
              onChange={() => {
                setActiveTab("mapped");
                clearSelection();
              }}
              aria-label="Mapped properties"
            />
            <input
              type="radio"
              name="property-tabs"
              id="unmapped-tab"
              className="tab flex-1 w-full"
              checked={activeTab === "unmapped"}
              onChange={() => {
                setActiveTab("unmapped");
                clearSelection();
              }}
              aria-label="Unmapped properties"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4 w-full justify-between">
          <SearchInput />
          <SortDropdown />
        </div>
      </div>

      <div role="tabpanel" className={activeTab === "mapped" ? "" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
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

      <div role="tabpanel" className={activeTab === "unmapped" ? "" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
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
  );
}
