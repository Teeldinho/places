import { type PropertyRto } from "@/lib/schema";

interface PropertyNameProps {
  property: PropertyRto;
}

export default function PropertyName({ property }: PropertyNameProps) {
  return <h3 className="card-title text-lg font-bold line-clamp-1">{property.property || property.subcommunity}</h3>;
}
