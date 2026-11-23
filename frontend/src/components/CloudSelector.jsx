import { Cloud } from "lucide-react";

export default function CloudSelector({ selected, onChange }) {
  return (
    <div className="cloud-selector">
      <button
        className={selected === "AWS" ? "selected" : ""}
        onClick={() => onChange("AWS")}
      >
        <Cloud size={17} />
        AWS
      </button>

      <button
        className={selected === "GCP" ? "selected" : ""}
        onClick={() => onChange("GCP")}
      >
        <Cloud size={17} />
        Google Cloud
      </button>
    </div>
  );
}
