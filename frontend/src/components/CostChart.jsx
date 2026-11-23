
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function CostChart({ data }) {
  const formatCurrency = (value) =>
    `$${Number(value).toLocaleString("en-US")}`;

  return (
    <div className="chart-container">
      <div className="chart-heading">
        <div>
          <h3>Evolución de costos</h3>
          <p>Histórico y proyección de gastos</p>
        </div>

        <span className="chart-period">Últimos 6 meses + forecast</span>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#20c9b0" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#20c9b0" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#263448"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#8190a5"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#8190a5"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                background: "#14243a",
                border: "1px solid #263448",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="actual"
              name="Gasto real"
              stroke="#20c9b0"
              strokeWidth={2.5}
              fill="url(#actualGradient)"
              connectNulls={false}
            />

            <Area
              type="monotone"
              dataKey="predicted"
              name="Predicción IA"
              stroke="#6698ed"
              strokeWidth={2.5}
              strokeDasharray="6 5"
              fill="transparent"
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
