import {
  DollarSign,
  TrendingUp,
  Server,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import CloudSelector from "../components/CloudSelector";
import CostChart from "../components/CostChart";

import "../App.css"

import {
  AnomalyCard,
  InsightCard,
} from "../components/InsightCard";

import { mockData } from "../data/mockData";

import { useState } from "react";

export default function Dashboard() {
  const [selectedCloud, setSelectedCloud] = useState("AWS");

  const data = mockData[selectedCloud];

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
              <span className="status-dot" />
              Datos simulados
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
            value={data.anomalies.length}
            description="Eventos detectados"
            icon={AlertTriangle}
            trend="Requieren revisión"
            positive={false}
          />
        </section>

        <section className="dashboard-grid">
          <CostChart data={data.history} />

          <div className="side-panels">
            <div className="panel budget-panel">
              <h3>Resumen presupuestario</h3>

              <span className="budget-label">
                Gasto proyectado
              </span>

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

              <p>
                Gasto actual: {currency(data.monthlyCost)}
              </p>
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
          <AnomalyCard anomalies={data.anomalies} />
          <InsightCard insights={data.insights} />
        </section>

        <footer className="dashboard-footer">
          <span>CloudPulse AI © 2026</span>
          <span>
            <RefreshCw size={13} />
            Entorno de demostración
          </span>
        </footer>
      </main>
    </div>
  );
}
