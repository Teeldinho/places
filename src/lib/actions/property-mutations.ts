import { z } from "zod";
import { type Property, AddPropertySchema, type AddPropertyData, EditPropertySchema, type EditPropertyData } from "@/lib/schema";
import { dummyProperties } from "@/lib/data/properties";

const properties: Property[] = [...dummyProperties];

// Simulate server action delay
const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export async function addPropertyAction(data: AddPropertyData) {
  await sleep(); // Simulate network latency

  try {
    const parsedData = AddPropertySchema.parse(data);

    const newProperty: Property = {
      ...parsedData,
      id: crypto.randomUUID(),
      lastUpdated: new Date(),
    };
    properties.push(newProperty);
    return { data: newProperty };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.format() };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function editPropertyAction(data: EditPropertyData) {
  await sleep(); // Simulate network latency

  try {
    const parsedData = EditPropertySchema.parse(data);
    const index = properties.findIndex((p) => p.id === parsedData.id);

    if (index === -1) {
      return { error: "Property not found." };
    }

    properties[index] = { ...parsedData, lastUpdated: new Date() };
    return { data: properties[index] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.format() };
    }
    return { error: "An unexpected error occurred." };
  }
}
