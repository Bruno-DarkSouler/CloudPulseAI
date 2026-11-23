
export const mockData = {
  AWS: {
    monthlyCost: 18450,
    previousCost: 20120,
    projectedCost: 19800,
    resources: 128,
    history: [
      { month: "Jun", actual: 14200, predicted: null },
      { month: "Jul", actual: 15800, predicted: null },
      { month: "Ago", actual: 15100, predicted: null },
      { month: "Sep", actual: 17300, predicted: null },
      { month: "Oct", actual: 16500, predicted: null },
      { month: "Nov", actual: 18450, predicted: null },
      { month: "Dic", actual: null, predicted: 19200 },
      { month: "Ene", actual: null, predicted: 19800 },
      { month: "Feb", actual: null, predicted: 20500 },
    ],
    anomalies: [
      {
        service: "Amazon EC2",
        description: "Incremento inusual del gasto diario",
        amount: 1250,
        severity: "Alta",
      },
      {
        service: "Amazon S3",
        description: "Aumento del almacenamiento",
        amount: 320,
        severity: "Media",
      },
    ],
    insights: [
      "El gasto de EC2 representa una parte importante del presupuesto.",
      "Se recomienda revisar las instancias con baja utilización.",
      "La proyección indica un posible incremento del gasto durante los próximos meses.",
    ],
  },

  GCP: {
    monthlyCost: 12680,
    previousCost: 11800,
    projectedCost: 13950,
    resources: 86,
    history: [
      { month: "Jun", actual: 9200, predicted: null },
      { month: "Jul", actual: 9800, predicted: null },
      { month: "Ago", actual: 10500, predicted: null },
      { month: "Sep", actual: 11000, predicted: null },
      { month: "Oct", actual: 11400, predicted: null },
      { month: "Nov", actual: 12680, predicted: null },
      { month: "Dic", actual: null, predicted: 13000 },
      { month: "Ene", actual: null, predicted: 13400 },
      { month: "Feb", actual: null, predicted: 13950 },
    ],
    anomalies: [
      {
        service: "Compute Engine",
        description: "Consumo elevado de CPU",
        amount: 780,
        severity: "Alta",
      },
      {
        service: "Cloud Storage",
        description: "Incremento de almacenamiento",
        amount: 190,
        severity: "Baja",
      },
    ],
    insights: [
      "Compute Engine presenta oportunidades de optimización.",
      "Se recomienda evaluar instancias sobredimensionadas.",
      "La proyección muestra un crecimiento moderado del presupuesto.",
    ],
  },
};
