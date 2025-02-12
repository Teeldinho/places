export default function MappingBadge({ status }: { status: string }) {
  return <div className={`badge badge-soft badge-secondary ml-2 ${status === "mapped" ? "badge-success" : "badge-warning"}`}>{status}</div>;
}
