import {
  Activity,
  LayoutDashboard,
  Cloud,
  BrainCircuit,
  MessageSquare,
  Settings,
  CircleHelp,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Infraestructura", icon: Cloud },
  { label: "Análisis IA", icon: BrainCircuit },
  { label: "Consultor IA", icon: MessageSquare },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Activity size={23} />
        </div>
        <div>
          <h2>CloudPulse</h2>
          <span>INTELLIGENCE PLATFORM</span>
        </div>
      </div>

      <div className="sidebar-section">
        <span className="section-label">WORKSPACE</span>

        <nav>
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`nav-item ${index === 0 ? "active" : ""}`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="nav-item">
          <CircleHelp size={19} />
          <span>Ayuda</span>
        </button>

        <button className="nav-item">
          <Settings size={19} />
          <span>Configuración</span>
        </button>

        <div className="sidebar-version">
          <span className="status-dot" />
          Sistema operativo
          <small>v1.0.0</small>
        </div>
      </div>
    </aside>
  );
}
