import { type PropertyRto } from "@/lib/schema";

interface PropertyDetailsProps {
  property: PropertyRto;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="text-sm flex flex-col gap-2">
      <p className="flex flex-col gap-0.5">
        <span className="opacity-50 text-xs tracking-wider">Community</span>
        <span className="font-medium opacity-80 text-base">{property.community}</span>
      </p>

      <p className="flex flex-col gap-0.5">
        <span className="opacity-50 text-xs tracking-wider">Sub-community</span>
        <span className="font-medium opacity-80 text-base">{property.subcommunity}</span>
      </p>
    </div>
  );
}
