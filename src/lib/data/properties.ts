import { PropertyRto } from "@/lib/schema";
import prp from "../../../public/prp.jpg";
import prp1 from "../../../public/prp1.jpg";
import prp2 from "../../../public/prp2.jpg";
import prp3 from "../../../public/prp3.jpg";

export const dummyProperties: PropertyRto[] = [
  {
    id: "dub-awr-001",
    city: "Dubai",
    community: "Al Aweer",
    subcommunity: "Al Aweer 1",
    property: "Desert Palm",
    coordinates: { lat: 25.205, lng: 55.271 },
    image: prp.src,
    isMapped: true,
  },
  {
    id: "dub-zbl-002",
    city: "Dubai",
    community: "Zabeel",
    subcommunity: "Zabeel Road",
    property: "Vida Za'abeel",
    coordinates: { lat: 25.207, lng: 55.275 },
    image: prp1.src,
    isMapped: true,
  },
  {
    id: "dub-mir-003",
    city: "Dubai",
    community: "Mira",
    subcommunity: "Mira Oasis 1",
    property: "Mira Oasis 1",
    isMapped: true,
    coordinates: { lat: 25.201, lng: 55.269 },
    image: prp2.src,
  },
  {
    id: "dub-wsl-004",
    city: "Dubai",
    community: "Wasl Gate",
    subcommunity: "The Nook 2",
    property: "The Nook 2",
    isMapped: false,
    coordinates: { lat: 25.203, lng: 55.273 },
    image: prp3.src,
  },
];
