import { mapParamsCache } from "@/lib/store/cache";

export default function AnotherServerComponent() {
  const sP = mapParamsCache.get("map");

  return (
    <div className="flex flex-col gap-2">
      <h2 className="card-title">Current Params from Another Server Component</h2>
      <pre className="bg-base-200 p-4 rounded">{JSON.stringify(sP, null, 2)}</pre>
    </div>
  );
}
