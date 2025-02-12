import { type Property } from "@/lib/schema";
import Image from "next/image";
import MappingBadge from "@/components/properties/MappingBadge";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="card shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 p-4">
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
        <h3 className="card-title text-lg">{property.property || property.subcommunity}</h3>

        <div className="text-sm space-y-2">
          <p className="flex items-center gap-1">
            <span className="opacity-60">Community:</span>
            <span className="font-medium">{property.community}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="opacity-60">Subcommunity:</span>
            <span className="font-medium">{property.subcommunity}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
