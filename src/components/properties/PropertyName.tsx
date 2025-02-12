import { type Property } from "@/lib/schema";

interface PropertyNameProps {
  property: Property;
}

export default function PropertyName({ property }: PropertyNameProps) {
  return <h3 className="card-title text-lg">{property.property || property.subcommunity}</h3>;
}
