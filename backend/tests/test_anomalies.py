from aws.anomalies.service import detect_anomalies


def test_detects_high_cost_anomaly():
    records = [
        {
            "service": "EC2",
            "costs": [120, 125, 118, 130, 122, 127, 119, 124, 126, 310],
        }
    ]

    anomalies = detect_anomalies(records)

    assert len(anomalies) == 1
    assert anomalies[0]["service"] == "EC2"
    assert anomalies[0]["value"] == 310
    assert anomalies[0]["severity"] == "high"


def test_does_not_detect_normal_cost():
    records = [
        {
            "service": "EC2",
            "costs": [120, 125, 118, 130, 122, 127, 119, 124, 126, 128],
        }
    ]

    anomalies = detect_anomalies(records)

    assert anomalies == []


def test_ignores_insufficient_data():
    records = [
        {
            "service": "EC2",
            "costs": [120, 125, 310],
        }
    ]

    anomalies = detect_anomalies(records)

    assert anomalies == []