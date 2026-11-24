const API_TIMEOUT_MS = 10000;

export async function apiGet(baseUrl, path) {
  if (!baseUrl) {
    throw new Error("No está configurada la URL de la API.");
  }

  const url = `${baseUrl.replace(/\/$/, "")}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        body?.error || `La API respondió con HTTP ${response.status}.`
      );
    }

    return body;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("La solicitud a AWS superó el tiempo de espera.");
    }
    if (error instanceof TypeError) {
      throw new Error(
        "No se pudo conectar con AWS. Verificá que el servidor esté activo y que CORS esté habilitado."
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
