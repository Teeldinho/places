"use client";
import { useMapParams } from "@/lib/store/client";

export default function SearchInput() {
  const { query, setQuery } = useMapParams();

  return (
    <label className="input input-bordered flex items-center gap-2 w-full relative">
      <input
        type="text"
        className="grow pr-10"
        placeholder="Search properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "12px",
        }}
      />
      {query && (
        <button onClick={() => setQuery("")} className="absolute right-10 btn btn-ghost btn-xs">
          ✕
        </button>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
        style={{
          marginRight: "12px",
        }}
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
