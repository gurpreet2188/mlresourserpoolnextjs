# Use the official Python base image with Python 3.9
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY . /app

# Install dependencies
RUN pip install -r requirements.txt

# Expose port 8000 (default port for FastAPI)
EXPOSE 8000

# Start the FastAPI server with Uvicorn
CMD ["uvicorn", "main:main", "--host", "0.0.0.0", "--port", "8000"]
