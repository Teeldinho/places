"use client";

import { type PropertyRto } from "@/lib/schema";
import PropertyCard from "@/components/properties/PropertyCard";
import { useMapParams } from "@/lib/store/client";
import { useProperties } from "@/lib/hooks/useProperties";
import { useMapNavigation } from "@/lib/hooks/useMapNavigation";
import { useState, useRef, useEffect } from "react";
import SortDropdown from "@/components/properties/SortDropdown";
import SearchInput from "@/components/properties/SearchInput";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function PropertyList({ properties }: { properties: PropertyRto[] }) {
  const { sort, query } = useMapParams();
  const { mappedProperties, unmappedProperties } = useProperties(properties, sort, query);

  const { selectedId, selectProperty, clearSelection } = useMapParams();
  const { focusProperty } = useMapNavigation();

  const [activeTab, setActiveTab] = useState<"mapped" | "unmapped">("mapped");
  const [columnCount, setColumnCount] = useState(1);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1536) setColumnCount(3); // 2xl screens
      else if (width >= 768) setColumnCount(2); // md screens and above
      else setColumnCount(1); // mobile
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const visibleProperties = activeTab === "mapped" ? mappedProperties : unmappedProperties;

  const virtualizer = useVirtualizer({
    count: Math.ceil(visibleProperties.length / columnCount),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 330,
    overscan: 5,
  });

  useEffect(() => {
    if (!selectedId) return;

    const selectedIndex = visibleProperties.findIndex((p) => p.id === selectedId);
    if (selectedIndex >= 0) {
      const rowIndex = Math.floor(selectedIndex / columnCount);
      const virtualItems = virtualizer.getVirtualItems();
      const isVisible = virtualItems.some((vItem) => vItem.index === rowIndex);

      if (!isVisible) {
        virtualizer.scrollToIndex(rowIndex, { behavior: "smooth", align: "center" });
      }
    }
  }, [selectedId, visibleProperties, columnCount, virtualizer]);

  return (
    <div
      className="w-[90vw] lg:w-[40vw] h-screen p-4 border-r border-base-200 flex flex-col gap-3.5 bg-base-300"
      style={{
        padding: "12px",
        paddingBottom: "0px",
        paddingLeft: "8px",
        paddingRight: "8px",
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4 w-full">
          <div
            className="tabs tabs-box tabs-lg w-full"
            style={{
              marginLeft: "8px",
              marginRight: "8px",
              marginTop: "8px",
            }}
          >
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
              aria-label={`Mapped properties (${mappedProperties.length})`}
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
              aria-label={`Unmapped properties (${unmappedProperties.length})`}
            />
          </div>
        </div>

        <div
          className="flex gap-4 mb-0 w-full justify-between"
          style={{
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          <SearchInput />
          <SortDropdown />
        </div>
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto">
        <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
          {virtualizer.getVirtualItems().map((virtualRow) => {
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className="flex gap-4 px-2 pb-4 h-full"
                  style={{
                    padding: "12px",
                  }}
                >
                  {Array.from({ length: columnCount }).map((_, index) => {
                    const itemIndex = virtualRow.index * columnCount + index;
                    const property = visibleProperties[itemIndex];

                    return property ? (
                      <div key={property.id} className="flex-1 h-full">
                        <PropertyCard
                          property={property}
                          isSelected={selectedId === property.id}
                          onClick={() => {
                            selectProperty(property.id);
                            focusProperty(property);
                          }}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
