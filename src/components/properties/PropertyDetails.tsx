import { type Property } from "@/lib/schema";

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
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
  );
}
