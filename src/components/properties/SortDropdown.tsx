"use client";

import { useMapParams } from "@/lib/store/client";

export default function SortDropdown() {
  const { sort, setSortField, setSortDirection } = useMapParams();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-ghost">
        Sort
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a onClick={() => setSortField("property")} className={sort.field === "property" ? "active" : ""}>
            Property Name
          </a>
        </li>
        <li>
          <a onClick={() => setSortField("community")} className={sort.field === "community" ? "active" : ""}>
            Community
          </a>
        </li>
        <li>
          <a onClick={() => setSortField("subcommunity")} className={sort.field === "subcommunity" ? "active" : ""}>
            Subcommunity
          </a>
        </li>
        <li className="divider mt-1 mb-1"></li>
        <li>
          <a onClick={() => setSortDirection("asc")} className={sort.direction === "asc" ? "active" : ""}>
            Ascending
          </a>
        </li>
        <li>
          <a onClick={() => setSortDirection("desc")} className={sort.direction === "desc" ? "active" : ""}>
            Descending
          </a>
        </li>
      </ul>
    </div>
  );
}
