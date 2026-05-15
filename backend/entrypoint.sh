#!/usr/bin/env sh
set -eu

echo "Waiting for database connection..."
python - <<'PY'
import os
import time
import psycopg2
from urllib.parse import urlparse

database_url = os.getenv("DATABASE_URL")

if database_url:
    parsed = urlparse(database_url)
    host = parsed.hostname or "localhost"
    port = parsed.port or 5432
    name = (parsed.path or "/")[1:] or None
    user = parsed.username
    password = parsed.password
else:
    host = os.getenv("DB_HOST", "localhost")
    port = int(os.getenv("DB_PORT", "5432"))
    name = os.getenv("DB_NAME")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")

deadline = time.time() + 60
last_error = None
while time.time() < deadline:
    try:
        conn = psycopg2.connect(
            host=host,
            port=port,
            dbname=name,
            user=user,
            password=password,
            connect_timeout=3,
        )
        conn.close()
        print("Database is reachable.")
        raise SystemExit(0)
    except Exception as exc:
        last_error = exc
        time.sleep(1)

print(f"Database not reachable after 60s: {last_error}")
raise SystemExit(1)
PY

echo "Applying migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting gunicorn..."
bind_port="${PORT:-8000}"
exec gunicorn config.wsgi:application --bind "0.0.0.0:${bind_port}" --workers 3
