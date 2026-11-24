import { apiGet } from "./api";

const AWS_API_URL = import.meta.env.VITE_AWS_API_URL;

export async function getAwsAnomalies() {
  const params = new URLSearchParams({ cloud: "AWS" });
  const data = await apiGet(
    AWS_API_URL,
    `/api/v1/anomalies?${params.toString()}`
  );

  if (!data || data.success !== true || !Array.isArray(data.anomalies)) {
    throw new Error("AWS devolvió una respuesta de anomalías inválida.");
  }

  return {
    anomalies: data.anomalies,
    total: Number(data.total ?? data.anomalies.length),
    source: data.source ?? "unknown",
    cloud: data.cloud ?? "AWS",
  };
}
