import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  positive,
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{title}</span>

        <div className="stat-icon">
          <Icon size={20} />
        </div>
      </div>

      <h2>{value}</h2>

      <div className="stat-bottom">
        <span className={positive ? "trend positive" : "trend negative"}>
          {positive ? (
            <TrendingDown size={15} />
          ) : (
            <TrendingUp size={15} />
          )}
          {trend}
        </span>

        <span className="stat-description">{description}</span>
      </div>
    </article>
  );
}
