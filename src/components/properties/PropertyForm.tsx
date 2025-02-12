"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPropertyAction, editPropertyAction } from "@/lib/actions/property-mutations";
import { AddPropertySchema, EditPropertySchema, type PropertyRto } from "@/lib/schema";
import { DEFAULT_LAT, DEFAULT_LNG, isWithinGeofence } from "@/lib/geofence";

interface PropertyFormProps {
  property?: PropertyRto; // Optional property for editing
  onSuccess: () => void;
}

export default function PropertyForm({ property, onSuccess }: PropertyFormProps) {
  const isEditMode = Boolean(property);

  const FormSchema = isEditMode ? EditPropertySchema : AddPropertySchema;
  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEditMode
      ? {
          property: property?.property ?? undefined,
          coordinates: property?.coordinates ?? { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
          isMapped: property?.isMapped ?? false,
        }
      : {
          coordinates: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
          isMapped: false,
        },
  });

  const onSubmit = async (data: FormSchemaType) => {
    if (!isWithinGeofence(data.coordinates.lng, data.coordinates.lat)) {
      setError("coordinates", { message: "Coordinates must be within Dubai area" });
      return;
    }

    let result;
    if (isEditMode) {
      result = await editPropertyAction({
        ...data,
        id: property!.id,
        city: property?.city ?? "Dubai",
      });
    } else {
      result = await addPropertyAction({
        ...data,
        id: crypto.randomUUID(),
        city: "Dubai",
      });
    }

    if (result?.error) {
      console.error("Server action error:", result.error);
    } else if (result) {
      onSuccess();
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="property" className="label">
          Property Name
        </label>
        <input id="property" {...register("property")} className="input input-bordered w-full" placeholder="Enter property name" />
        {errors.property && <span className="text-error">{errors.property.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="coordinates.lat" className="label">
            Latitude
          </label>
          <input
            id="coordinates.lat"
            type="number"
            step="any"
            {...register("coordinates.lat", { valueAsNumber: true })}
            className="input input-bordered w-full"
          />
          {errors.coordinates?.lat && <span className="text-error">{errors.coordinates.lat.message}</span>}
        </div>

        <div>
          <label htmlFor="coordinates.lng" className="label">
            Longitude
          </label>
          <input
            id="coordinates.lng"
            type="number"
            step="any"
            {...register("coordinates.lng", { valueAsNumber: true })}
            className="input input-bordered w-full"
          />
          {errors.coordinates?.lng && <span className="text-error">{errors.coordinates.lng.message}</span>}
        </div>
      </div>

      {errors.coordinates?.message && <div className="text-error text-sm">{errors.coordinates.message}</div>}

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input type="checkbox" className="toggle toggle-primary" {...register("isMapped")} />
          <span className="label-text">Mark as Mapped</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        {isSubmitting ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}
