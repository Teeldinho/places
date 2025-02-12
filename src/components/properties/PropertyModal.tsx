"use client";

import { useState } from "react";
import PropertyForm from "@/components/properties/PropertyForm";
import { type PropertyRto } from "@/lib/schema";

interface PropertyModalProps {
  property?: PropertyRto;
  trigger: React.ReactNode;
}

export default function PropertyModal({ property, trigger }: PropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditMode = Boolean(property);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="contents">
        {trigger}
      </div>

      <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg mb-4">{isEditMode ? "Edit Property" : "Add New Property"}</h3>
          <PropertyForm
            property={property}
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
          <div className="modal-action absolute top-2 right-2">
            <button type="button" className="btn btn-circle btn-sm btn-dash" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
