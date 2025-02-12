"use client";

import { useMapParams } from "@/lib/store/client";
import { useMapNavigation } from "@/lib/hooks/useMapNavigation";

export default function ResetButton() {
  const { clearSelection } = useMapParams();
  const { resetMap } = useMapNavigation();

  const handleReset = () => {
    clearSelection();
    resetMap();
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <button type="button" onClick={handleReset} className="btn btn-circle btn-primary shadow-lg" aria-label="Reset view">
        ↺
      </button>
    </div>
  );
}
