from datetime import date, timedelta


def get_forecast():
    """
    Devuelve datos simulados para probar el contrato de la API.
    Posteriormente se reemplazará por el modelo Random Forest.
    """

    historical = [
        {"date": "2026-06-01", "cost": 9200.00},
        {"date": "2026-07-01", "cost": 9800.00},
        {"date": "2026-08-01", "cost": 10400.00},
        {"date": "2026-09-01", "cost": 10850.00},
        {"date": "2026-10-01", "cost": 11100.00},
        {"date": "2026-11-01", "cost": 12680.00},
    ]

    last_cost = historical[-1]["cost"]
    daily_increase = 0.035

    forecast = []

    for day in range(1, 31):
        predicted_cost = last_cost * (1 + daily_increase * day / 30)

        forecast.append({
            "date": (date.today() + timedelta(days=day)).isoformat(),
            "predicted_cost": round(predicted_cost, 2),
        })

    predicted_month = 13950.00
    current_month = last_cost

    variation = (
        (predicted_month - current_month) / current_month
    ) * 100

    return {
        "success": True,
        "cloud": "AWS",
        "period": "30_days",
        "currency": "USD",
        "historical": historical,
        "forecast": forecast,
        "summary": {
            "current_month": current_month,
            "predicted_month": predicted_month,
            "variation_percent": round(variation, 2),
        },
        "source": "simulated",
    }