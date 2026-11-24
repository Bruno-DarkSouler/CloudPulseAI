from datetime import datetime, timezone
from statistics import mean, pstdev


# Datos simulados para probar el detector.
# Más adelante se obtendrán de DynamoDB.
MOCK_COSTS = [
    {
        "service": "EC2",
        "costs": [120, 125, 118, 130, 122, 127, 119, 124, 126, 310],
    },
    {
        "service": "S3",
        "costs": [40, 42, 39, 43, 41, 40, 44, 42, 41, 85],
    },
]


def detect_anomalies(records, threshold=2.0):
    """
    Detecta valores atípicos mediante Z-score.

    Cada registro debe contener:
    - service: nombre del servicio.
    - costs: lista de costos históricos.
    """

    anomalies = []

    for record in records:
        service = record["service"]
        costs = record["costs"]

        # Necesitamos suficientes observaciones para calcular
        # una desviación estándar representativa.
        if len(costs) < 4:
            continue

        historical = costs[:-1]
        current = costs[-1]

        average = mean(historical)
        deviation = pstdev(historical)

        # Si todos los valores históricos son iguales,
        # no podemos calcular un Z-score convencional.
        if deviation == 0:
            continue

        z_score = (current - average) / deviation

        if abs(z_score) >= threshold:
            anomalies.append({
                "id": f"anom-{service.lower()}",
                "service": service,
                "description": (
                    "Gasto superior al comportamiento histórico."
                    if z_score > 0
                    else "Gasto inferior al comportamiento histórico."
                ),
                "value": round(current, 2),
                "average": round(average, 2),
                "z_score": round(z_score, 2),
                "severity": (
                    "high" if abs(z_score) >= 3 else "medium"
                ),
                "detected_at": datetime.now(
                    timezone.utc
                ).isoformat(),
            })

    return anomalies


def get_anomalies():
    anomalies = detect_anomalies(MOCK_COSTS)

    return {
        "success": True,
        "cloud": "AWS",
        "total": len(anomalies),
        "anomalies": anomalies,
        "source": "simulated",
    }
