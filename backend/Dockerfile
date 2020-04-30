# Use an official Python runtime as a parent image
FROM python:3.8.0-alpine

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /app/backend

# Add the rest of the code
COPY . /app/backend

# Make port 8000 available for the app
EXPOSE 8000

# run entrypoint.sh
ENTRYPOINT ["/app/backend/entrypoint.sh"]
