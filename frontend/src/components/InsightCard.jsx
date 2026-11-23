import { AlertTriangle, Sparkles } from "lucide-react";

export function AnomalyCard({ anomalies }) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>Anomalías detectadas</h3>
          <p>Comportamientos inusuales en tus servicios</p>
        </div>

        <AlertTriangle size={20} className="warning-icon" />
      </div>

      <div className="anomaly-list">
        {anomalies.map((item, index) => (
          <div className="anomaly-item" key={index}>
            <div className="anomaly-info">
              <strong>{item.service}</strong>
              <span>{item.description}</span>
            </div>

            <div className="anomaly-meta">
              <strong>${item.amount.toLocaleString("en-US")}</strong>
              <span className={`severity ${item.severity.toLowerCase()}`}>
                {item.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function InsightCard({ insights }) {
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
