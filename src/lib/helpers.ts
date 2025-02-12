import { type Property } from "@/lib/schema";

import prp from "../../public/assets/prp.jpg";
import prp1 from "../../public/assets/prp1.jpg";
import prp2 from "../../public/assets/prp2.jpg";
import prp3 from "../../public/assets/prp3.jpg";
import prp4 from "../../public/assets/prp4.jpg";
import prp5 from "../../public/assets/prp5.jpg";
import prp6 from "../../public/assets/prp6.jpg";
import prp7 from "../../public/assets/prp7.jpg";
import prp8 from "../../public/assets/prp8.jpg";

export function getPropertyImage(): string {
  const images = [prp4.src, prp7.src, prp2.src, prp8.src, prp1.src, prp5.src, prp.src, prp3.src, prp6.src];
  return images[Math.floor(Math.random() * images.length)] || "https://placehold.co/600x400";
}

export function determineIsMapped(property: Property): boolean {
  return !!property.property; // Simple check for now
}

export function getCoordinates(property: Property): { lat: number; lng: number } {
  if (property.property === "Desert Palm") {
    return { lat: 25.2048, lng: 55.2708 };
  }

  if (property.property === "Vida Za'abeel") {
    return { lat: 25.207, lng: 55.275 };
  }

  // Placeholder coordinates - implement geocoding later
  return {
    lat: 25.2048 + Math.random() * 0.01,
    lng: 55.2708 + Math.random() * 0.01,
  };
}
