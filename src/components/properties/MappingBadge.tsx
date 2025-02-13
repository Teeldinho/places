export default function MappingBadge({ isMapped }: { isMapped: boolean }) {
  return (
    <div
      className={`badge ${isMapped ? "badge-success badge" : "badge-warning"} flex flex-row items-center justify-center`}
      style={{
        padding: "12px",
      }}
    >
      {isMapped ? "Mapped" : "Unmapped"}
    </div>
  );
}
