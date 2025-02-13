"use client";

import { type PropertyRto } from "@/lib/schema";
import Image from "next/image";
import MappingBadge from "@/components/properties/MappingBadge";
import PropertyName from "@/components/properties/PropertyName";
import PropertyDetails from "@/components/properties/PropertyDetails";
import PropertyModal from "@/components/properties/PropertyModal";

interface PropertyCardProps {
  property: PropertyRto;
  isSelected: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export default function PropertyCard({ property, isSelected, onClick, onClose }: PropertyCardProps) {
  return (
    <div className="relative hover:shadow-md transition-all">
      {onClose && (
        <button type="button" onClick={onClose} className="absolute top-1 right-1 btn btn-circle btn-sm btn-dash opacity-60 z-20" aria-label="Close">
          ✕
        </button>
      )}

      <div
        className={`card bg-base-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-0 ${onClick ? "cursor-pointer" : ""} ${
          isSelected ? "ring-4 ring-primary" : ""
        }`}
        onClick={onClick}
      >
        <figure className="h-40 bg-base-500 relative">
          <Image src={property.image} alt={property.property || property.subcommunity || "Property Image"} fill className="bg-base-200 rounded-lg" />

          <div className="absolute top-2 left-2">
            <MappingBadge isMapped={property.isMapped} />
          </div>

          <PropertyModal
            property={property}
            trigger={
              <button type="button" className="absolute -bottom-[72px] right-2 btn btn-circle btn-sm btn-primary opacity-70 z-20" aria-label="Edit">
                ✎
              </button>
            }
          />
        </figure>

        <div
          className="card-body flex flex-col gap-1.5 transition-all"
          style={{
            padding: "12px",
            paddingTop: "8px",
            paddingBottom: "12px",
          }}
        >
          <PropertyName property={property} />
          <PropertyDetails property={property} />
        </div>
      </div>
    </div>
  );
}
