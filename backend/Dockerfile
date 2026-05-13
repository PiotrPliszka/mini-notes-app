FROM python:3.14-slim
WORKDIR /app
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
CMD ["gunicorn", "config.wsgi:app lication", "--bind", "0.0.0.0:8000", "--workers", "3"]