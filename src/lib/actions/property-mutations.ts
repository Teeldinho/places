"use server";

import { z } from "zod";
import { type Property, mapPropertyDtoToRto, AddPropertySchema, EditPropertySchema } from "@/lib/schema";
import { getPropertyById } from "@/lib/queries/property-queries";
import { createClient } from "@/utils/supabase/server";

export async function addPropertyAction(newProperty: Property) {
  const supabase = await createClient();

  // Map the new property to the RTO
  const rto = mapPropertyDtoToRto(newProperty);

  // Validate the new property
  const parsed = AddPropertySchema.safeParse(rto);

  // If the new property is not valid, return an error
  if (!parsed.success) return { error: parsed.error.format() };

  // Upsert the new property
  const { data, error } = await supabase.from("places").upsert(parsed.data);

  // If there is an error, return an error
  if (error) return { error: error.message };

  // Return the new property
  return { success: true, data };
}

export async function editPropertyAction(updatedProperty: Property) {
  const supabase = await createClient();

  // Map the updated property to the RTO
  const rto = mapPropertyDtoToRto(updatedProperty);

  // Validate the updated property
  const parsed = EditPropertySchema.safeParse(rto);

  // If the updated property is not valid, return an error
  if (!parsed.success) return { error: parsed.error.format() };

  try {
    // Get the existing property
    const property = await getPropertyById(parsed.data.id);

    // If the property is not found, return an error
    if (!property) {
      return { error: "Property not found." };
    }

    // Update the property
    const { data, error } = await supabase.from("places").update(parsed.data).eq("id", parsed.data.id);

    // If there is an error, return an error
    if (error) return { error: error.message };

    // Return the updated property
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.format() };
    }
    return { error: "An unexpected error occurred." };
  }
}
