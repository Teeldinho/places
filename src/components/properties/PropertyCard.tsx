"use client";

import { type Property } from "@/lib/schema";
import Image from "next/image";
import MappingBadge from "@/components/properties/MappingBadge";
import PropertyName from "@/components/properties/PropertyName";
import PropertyDetails from "@/components/properties/PropertyDetails";

interface PropertyCardProps {
  property: Property;
  isSelected: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export default function PropertyCard({ property, isSelected, onClick, onClose }: PropertyCardProps) {
  return (
    <div className="relative">
      {onClose && (
        <button type="button" onClick={onClose} className="absolute top-1 right-1 btn btn-circle btn-sm btn-ghost z-20" aria-label="Close">
          ✕
        </button>
      )}

      <div
        className={`card bg-base-100 shadow-sm hover:shadow-md transition-all ${onClick ? "cursor-pointer" : ""} ${
          isSelected ? "ring-4 ring-primary" : ""
        }`}
        onClick={onClick}
      >
        <figure className="h-40 bg-base-500 relative">
          <Image
            src={property.image}
            alt={property.property || property.subcommunity}
            width={600}
            height={400}
            className="h-40 bg-base-200 rounded-lg"
          />

          <div className="absolute top-2 left-2">
            <MappingBadge status={property.status} />
          </div>
        </figure>

        <div className="card-body p-4 flex flex-col gap-1">
          <PropertyName property={property} />
          <PropertyDetails property={property} />
        </div>
      </div>
    </div>
  );
}
