# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . /app/

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "todo_project.wsgi:application"]
