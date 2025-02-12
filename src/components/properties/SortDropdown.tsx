"use client";

import { useMapParams } from "@/lib/store/client";

const SORT_FIELDS = [
  { label: "Property Name", value: "property" },
  { label: "Community", value: "community" },
  { label: "Subcommunity", value: "subcommunity" },
];

const SORT_DIRECTIONS = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

export default function SortDropdown() {
  const { sort, setSortField, setSortDirection, resetSort } = useMapParams();

  return (
    <div className="dropdown dropdown-bottom min-w-24 bg-base-200 flex items-center justify-center rounded-md">
      <label tabIndex={0} className="btn btn-sm btn-ghost">
        Sort
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>

      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-64 rounded-md">
        {/* Sort Fields */}
        {SORT_FIELDS.map(({ label, value }) => (
          <li key={value}>
            <a onClick={() => setSortField(value as "property" | "community" | "subcommunity")} className={sort.field === value ? "active" : ""}>
              {label}
            </a>
          </li>
        ))}

        <li className="divider mt-1 mb-1" />

        {/* Sort Directions */}
        {SORT_DIRECTIONS.map(({ label, value }) => (
          <li key={value}>
            <a onClick={() => setSortDirection(value as "asc" | "desc")} className={sort.direction === value ? "active" : ""}>
              {label}
            </a>
          </li>
        ))}

        <li className="divider mt-1 mb-1" />

        {/* Reset Action */}
        <li>
          <a onClick={resetSort} className={!sort.field ? "active" : ""}>
            Reset Sorting
          </a>
        </li>
      </ul>
    </div>
  );
}
