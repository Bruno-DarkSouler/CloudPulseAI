import { AlertTriangle, Sparkles, LoaderCircle } from "lucide-react";

const severityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
  alta: "Alta",
  media: "Media",
  baja: "Baja",
};

const severityClasses = {
  high: "alta",
  medium: "media",
  low: "baja",
  alta: "alta",
  media: "media",
  baja: "baja",
};

export function AnomalyCard({
  anomalies = [],
  loading = false,
  error = "",
  source = "",
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>Anomalías detectadas</h3>
          <p>Comportamientos inusuales en tus servicios</p>
        </div>
        <AlertTriangle size={20} className="warning-icon" />
      </div>

      {loading ? (
        <div className="anomaly-state">
          <LoaderCircle size={18} className="loading-spinner" />
          Consultando anomalías de AWS...
        </div>
      ) : error ? (
        <div className="anomaly-state anomaly-error" role="alert">
          <strong>No se pudieron cargar las anomalías</strong>
          <span>{error}</span>
        </div>
      ) : anomalies.length === 0 ? (
        <div className="anomaly-state">
          No se detectaron anomalías.
        </div>
      ) : (
        <div className="anomaly-list">
          {anomalies.map((item, index) => {
            const severityKey = String(item.severity ?? "low").toLowerCase();
            const severityClass = severityClasses[severityKey] ?? "baja";
            const severityLabel = severityLabels[severityKey] ?? item.severity;
            const amount = item.value ?? item.amount ?? 0;

            return (
              <div className="anomaly-item" key={item.id ?? `${item.service}-${index}`}>
                <div className="anomaly-info">
                  <strong>{item.service}</strong>
                  <span>{item.description}</span>
                  {Number.isFinite(Number(item.z_score)) && (
                    <small>Z-score: {Number(item.z_score).toFixed(2)}</small>
                  )}
                </div>

                <div className="anomaly-meta">
                  <strong>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 2,
                    }).format(Number(amount))}
                  </strong>
                  <span className={`severity ${severityClass}`}>
                    {severityLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {source && !loading && !error && (
        <div className="anomaly-source">
          Origen: {source === "simulated" ? "Datos simulados (AWS)" : source}
        </div>
      )}
    </section>
  );
}

export function InsightCard({ insights = [] }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>AI Insights</h3>
          <p>Recomendaciones inteligentes</p>
        </div>
        <Sparkles size={20} className="ai-icon" />
      </div>

      <div className="insight-list">
        {insights.map((insight, index) => (
          <div className="insight-item" key={index}>
            <span className="insight-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p>{insight}</p>
          </div>
        ))}
      </div>

      <div className="ai-footer">
        <Sparkles size={14} />
        Generado mediante IA · Datos simulados
      </div>
    </section>
  );
}
