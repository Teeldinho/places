import { AClientComponent } from "@/components/AClientComponent";
import AnotherServerComponent from "@/components/AnotherServerComponent";
import { mapParamsCache } from "@/lib/store/cache";
import type { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function TestPage({ searchParams }: PageProps) {
  const { map } = await mapParamsCache.parse(searchParams);

  return (
    <div className="card bg-base-100 shadow-xl p-8">
      <div className="card-body">
        <h2 className="card-title">Current Params</h2>
        <pre className="bg-base-200 p-4 rounded">{JSON.stringify(map, null, 2)}</pre>

        <AnotherServerComponent />
        <AClientComponent />
      </div>
    </div>
  );
}
