export default function MappingBadge({ isMapped }: { isMapped: boolean }) {
  return <div className={`badge ${isMapped ? "badge-success" : "badge-warning"}`}>{isMapped ? "Mapped" : "Unmapped"}</div>;
}
