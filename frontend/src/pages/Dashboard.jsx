import {
  DollarSign,
  TrendingUp,
  Server,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CloudSelector from "../components/CloudSelector";
import CostChart from "../components/CostChart";
import { AnomalyCard, InsightCard } from "../components/InsightCard";
import { mockData } from "../data/mockData";
import { getAwsAnomalies } from "../services/awsService";

import "../App.css";

export default function Dashboard() {
  const [selectedCloud, setSelectedCloud] = useState("AWS");
  const [awsAnomalies, setAwsAnomalies] = useState([]);
  const [anomalyLoading, setAnomalyLoading] = useState(false);
  const [anomalyError, setAnomalyError] = useState("");
  const [anomalySource, setAnomalySource] = useState("");

  const data = mockData[selectedCloud];
  const displayedAnomalies =
    selectedCloud === "AWS" ? awsAnomalies : data.anomalies;

  useEffect(() => {
    if (selectedCloud !== "AWS") return;

    let active = true;

    async function loadAnomalies() {
      setAnomalyLoading(true);
      setAnomalyError("");

      try {
        const result = await getAwsAnomalies();
        if (!active) return;

        setAwsAnomalies(result.anomalies);
        setAnomalySource(result.source);
      } catch (error) {
        if (!active) return;
        setAnomalyError(error.message || "Ocurrió un error inesperado.");
        setAnomalySource("");
      } finally {
        if (active) setAnomalyLoading(false);
      }
    }

    loadAnomalies();

    return () => {
      active = false;
    };
  }, [selectedCloud]);

  const variation = (
    ((data.monthlyCost - data.previousCost) / data.previousCost) * 100
  ).toFixed(1);
  const increase = Number(variation) > 0;

  const currency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const anomalyCount =
    selectedCloud === "AWS" && anomalyError
      ? "—"
      : selectedCloud === "AWS" && anomalyLoading
        ? "..."
        : displayedAnomalies.length;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="breadcrumb">WORKSPACE / OVERVIEW</span>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-right">
            <span className="live-indicator">
              <span className={`status-dot ${selectedCloud === "AWS" && anomalyError ? "status-dot-error" : ""}`} />
              {selectedCloud === "AWS"
                ? anomalyLoading
                  ? "Conectando con AWS..."
                  : anomalyError
                    ? "AWS desconectado"
                    : "AWS · API conectada"
                : "Datos simulados"}
            </span>
            <div className="avatar">BF</div>
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <h2>Monitoreo inteligente de infraestructura</h2>
            <p>
              Controlá tus gastos cloud y descubrí oportunidades
              de optimización con inteligencia artificial.
            </p>
          </div>

          <CloudSelector
            selected={selectedCloud}
            onChange={setSelectedCloud}
          />
        </section>

        <section className="stats-grid">
          <StatCard
            title="Gasto mensual"
            value={currency(data.monthlyCost)}
            description="vs. mes anterior"
            icon={DollarSign}
            trend={`${Math.abs(Number(variation))}%`}
            positive={!increase}
          />

          <StatCard
            title="Predicción mensual"
            value={currency(data.projectedCost)}
            description="Proyección IA"
            icon={TrendingUp}
            trend="30 días"
            positive={false}
          />

          <StatCard
            title="Recursos activos"
            value={data.resources}
            description="Instancias monitoreadas"
            icon={Server}
            trend="En seguimiento"
            positive={true}
          />

          <StatCard
            title="Anomalías"
            value={anomalyCount}
            description="Eventos detectados"
            icon={AlertTriangle}
            trend={anomalyError ? "API no disponible" : "Requieren revisión"}
            positive={false}
          />
        </section>

        <section className="dashboard-grid">
          <CostChart data={data.history} />

          <div className="side-panels">
            <div className="panel budget-panel">
              <h3>Resumen presupuestario</h3>
              <span className="budget-label">Gasto proyectado</span>
              <h2>{currency(data.projectedCost)}</h2>

              <div className="budget-progress">
                <div
                  style={{
                    width: `${Math.min(
                      (data.monthlyCost / data.projectedCost) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p>Gasto actual: {currency(data.monthlyCost)}</p>
            </div>

            <div className="panel cloud-panel">
              <h3>Proveedor seleccionado</h3>
              <div className="cloud-provider">
                <div className="provider-icon">
                  <Server size={23} />
                </div>
                <div>
                  <strong>{selectedCloud}</strong>
                  <span>Infraestructura cloud</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <AnomalyCard
            anomalies={displayedAnomalies}
            loading={selectedCloud === "AWS" && anomalyLoading}
            error={selectedCloud === "AWS" ? anomalyError : ""}
            source={selectedCloud === "AWS" ? anomalySource : "Datos simulados"}
          />
          <InsightCard insights={data.insights} />
        </section>

        <footer className="dashboard-footer">
          <span>CloudPulse AI © 2026</span>
          <span>
            <RefreshCw size={13} />
            {selectedCloud === "AWS" ? "AWS API + datos de demostración" : "Entorno de demostración"}
          </span>
        </footer>
      </main>
    </div>
  );
}
