import json

from aws.handler import lambda_handler


def test_anomalies_endpoint_returns_200():
    event = {
        "rawPath": "/api/v1/anomalies",
        "requestContext": {
            "http": {"method": "GET"}
        },
        "queryStringParameters": {"cloud": "AWS"},
    }

    result = lambda_handler(event, None)
    body = json.loads(result["body"])

    assert result["statusCode"] == 200
    assert body["success"] is True
    assert body["cloud"] == "AWS"
    assert body["total"] == 2


def test_anomalies_rejects_unsupported_cloud():
    event = {
        "rawPath": "/api/v1/anomalies",
        "requestContext": {
            "http": {"method": "GET"}
        },
        "queryStringParameters": {"cloud": "GCP"},
    }

    result = lambda_handler(event, None)
    body = json.loads(result["body"])

    assert result["statusCode"] == 400
    assert body["success"] is False
