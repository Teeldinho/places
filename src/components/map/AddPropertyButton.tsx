import PropertyModal from "@/components/properties/PropertyModal";

export default function AddPropertyButton() {
  return (
    <PropertyModal
      trigger={
        <button type="button" className="btn btn-primary shadow-lg" aria-label="Add property">
          Add A Property
        </button>
      }
    />
  );
}
