# Use a slim Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

# Copy all application code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the app with Gunicorn (production server)
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:5000", "app:app"]
