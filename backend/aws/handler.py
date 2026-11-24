import json

from aws.forecast.service import get_forecast
from aws.anomalies.service import get_anomalies


def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        "body": json.dumps(body),
    }


def lambda_handler(event, context):
    """
    Router HTTP para AWS Lambda + API Gateway.
    Compatible con eventos HTTP API v2 y REST API.
    """

    method = (
        event.get("requestContext", {})
        .get("http", {})
        .get("method")
        or event.get("httpMethod", "GET")
    )

    path = event.get("rawPath") or event.get("path", "/")

    if method == "OPTIONS":
        return response(200, {"success": True})

    if method == "GET" and path == "/api/v1/health":
        return response(200, {
            "success": True,
            "service": "CloudPulse AWS API",
            "status": "operational",
        })

    if method == "GET" and path == "/api/v1/anomalies":
        query_params = event.get("queryStringParameters") or {}
        cloud = query_params.get("cloud", "AWS").upper()

        if cloud != "AWS":
            return response(400, {
                "success": False,
                "error": "Esta API solamente procesa datos de AWS.",
            })

        return response(200, get_anomalies())

    if method == "GET" and path == "/api/v1/forecast":
        query_params = event.get("queryStringParameters") or {}
        cloud = query_params.get("cloud", "AWS").upper()

        if cloud != "AWS":
            return response(400, {
                "success": False,
                "error": "Esta API solamente procesa datos de AWS.",
            })

        return response(200, get_forecast())

    return response(404, {
        "success": False,
        "error": "Endpoint no encontrado.",
    })