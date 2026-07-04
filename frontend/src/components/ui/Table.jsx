import { Fragment, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Skeleton from "./Skeleton";

export default function Table({
  columns,
  data,
  keyField = "_id",
  loading = false,
  emptyState,
  sortable = false,
  defaultSort = null,
  onRowClick,
  expandedRowRender,
  className = "",
}) {
  const [sort, setSort] = useState(defaultSort);

  const sorted =
    sortable && sort
      ? [...data].sort((a, b) => {
          const av = a[sort.key];
          const bv = b[sort.key];
          if (av == null) return 1;
          if (bv == null) return -1;
          if (typeof av === "number" && typeof bv === "number") {
            return sort.dir === "asc" ? av - bv : bv - av;
          }
          return sort.dir === "asc"
            ? String(av).localeCompare(String(bv))
            : String(bv).localeCompare(String(av));
        })
      : data;

  const toggleSort = (key) => {
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  };

  return (
    <div className={`overflow-x-auto rounded-card border border-border bg-bg-elevated ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => {
              const isSortable = sortable && col.sortable !== false;
              return (
                <th
                  key={col.key}
                  onClick={() => isSortable && toggleSort(col.key)}
                  className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted
                    ${isSortable ? "cursor-pointer select-none hover:text-text-secondary" : ""}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {isSortable &&
                      sort?.key === col.key &&
                      (sort.dir === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      ))}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5">
                    <Skeleton className="h-4 w-full max-w-[160px]" />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2">
                {emptyState}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <Fragment key={row[keyField]}>
                <tr
                  onClick={() => onRowClick?.(row)}
                  className={`${onRowClick ? "cursor-pointer hover:bg-bg-secondary" : ""} transition-colors duration-[var(--duration-fast)]`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5 text-text-primary align-middle">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
                {expandedRowRender?.(row)}
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
