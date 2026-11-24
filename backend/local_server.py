
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from aws.handler import lambda_handler


class LocalLambdaHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        parsed_url = urlparse(self.path)

        query_params = {
            key: values[0]
            for key, values in parse_qs(parsed_url.query).items()
        }

        event = {
            "version": "2.0",
            "rawPath": parsed_url.path,
            "requestContext": {
                "http": {
                    "method": "GET"
                }
            },
            "queryStringParameters": query_params
        }

        result = lambda_handler(event, None)

        self.send_response(result["statusCode"])

        for key, value in result["headers"].items():
            self.send_header(key, value)

        self.end_headers()
        self.wfile.write(result["body"].encode("utf-8"))

    def do_OPTIONS(self):
        result = lambda_handler({
            "rawPath": self.path,
            "requestContext": {
                "http": {"method": "OPTIONS"}
            }
        }, None)

        self.send_response(result["statusCode"])

        for key, value in result["headers"].items():
            self.send_header(key, value)

        self.end_headers()
        self.wfile.write(result["body"].encode("utf-8"))


if __name__ == "__main__":
    server = HTTPServer(("localhost", 8000), LocalLambdaHandler)

    print("CloudPulse AI - AWS API local")
    print("Servidor disponible en http://localhost:8000")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nCerrando servidor...")
        server.server_close()
