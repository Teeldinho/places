"use client";
import { useMapParams } from "@/lib/store/client";

export function AClientComponent() {
  const params = useMapParams();

  return (
    <div className="ml-4 flex flex-col gap-2">
      <h2 className="card-title">Current Params from A Client Component</h2>

      <pre className="bg-base-200 p-4 rounded">{JSON.stringify(params, null, 2)}</pre>

      <div className="join">
        <button
          type="button"
          className="join-item btn btn-primary"
          onClick={() => params.setPosition(Number((params.lat + 0.1).toFixed(4)), Number((params.lng + 0.1).toFixed(4)))}
        >
          Move Northeast
        </button>
        <button type="button" className="join-item btn btn-secondary" onClick={() => params.setPosition(25.2048, 55.2708)}>
          Reset Dubai
        </button>
      </div>
    </div>
  );
}
