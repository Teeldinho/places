"use server";

import { mapPropertyDtoToRto, Property } from "@/lib/schema";
import { createClient } from "@/utils/supabase/server";

export async function getAllProperties() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("places").select();

  if (error || !data) return [];

  const properties = data.map(mapPropertyDtoToRto);

  return properties;
}

export async function getPropertyById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("places").select().eq("id", id);

  if (error || !data) return null;

  const property: Property = data[0];

  const rto = mapPropertyDtoToRto(property);

  return rto;
}
