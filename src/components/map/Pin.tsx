"use client";
import { type Property } from "@/lib/schema";

export default function Pin({ property, isSelected }: { property: Property; isSelected: boolean }) {
  return (
    <div className="group relative cursor-pointer">
      <div
        className={`absolute -top-2 -left-2 w-8 h-8 rounded-full 
        ${isSelected ? "bg-primary/20" : "bg-secondary/20"}
        transition-all duration-300 ease-out`}
      />
      <div
        className={`w-4 h-4 rounded-full shadow-lg border-2 transition-all
        ${isSelected ? "bg-primary border-primary-content scale-125" : "bg-secondary border-base-100 group-hover:scale-110"}`}
      />
      <div
        className={`absolute -top-8 -left-4 px-2 py-1 rounded-md text-xs font-medium
        bg-base-100 shadow-md opacity-0 group-hover:opacity-100 transition-opacity
        ${isSelected ? "opacity-100" : ""}`}
      >
        {property.property || property.subcommunity}
      </div>
    </div>
  );
}
