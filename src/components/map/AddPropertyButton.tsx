import PropertyModal from "@/components/properties/PropertyModal";

export default function AddPropertyButton() {
  return (
    <PropertyModal
      trigger={
        <button
          type="button"
          className="btn btn-primary shadow-lg"
          aria-label="Add property"
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          Add A Property
        </button>
      }
    />
  );
}
