# SIT725 Campus Lost and Found System - 8.1HD

This repository contains the containerised version of the **Campus Lost and Found System** for SIT725 Applied Software Engineering: Task 8.1HD.


## 1. Overview & Architecture

The application is fully containerised using **Docker** and orchestrated with **Docker Compose**, separating concerns into two independent, networked services:

1. **`app`**: Node.js & Express application serving the front-end user interface and RESTful APIs, built from the lightweight `node:lts-alpine` image.
2. **`mongodb`**: Database service using the official `mongo:latest` image with authentication and persistent named volume storage (`mongodb_data`).

Both services communicate across a dedicated, user-defined Docker bridge network (`app-network`), with MongoDB host resolution handled via Docker's internal DNS (`mongodb:27017`).

By default Docker compose uses a network to connect our services, but here the `app-network` is included to explicitly show that we are connecting the `app` and `mongodb` services.

## 2. Prerequisites

Ensure you have the following installed on your machine:
- **Docker Desktop** (version 29.5+)
- **Docker Compose** (version 5.1+)


## 3. Configuration & Sensitive Information

To protect sensitive credentials in a real environment while allowing markers to run and verify the submission effortlessly:
- Default fallback values are pre-configured directly within `docker-compose.yml` (`MONGO_USER: root`, `MONGO_PASSWORD: awesomepassword123`, `PORT: 3000`).
- **No manual configuration is required to run the application.** The marker can clone the repository and start the containers immediately without guessing missing values or modifying code.
- If you wish to provide custom environment values, copy the template and modify:
  ```bash
  cp .env.example .env
  ```
  Docker Compose will automatically load custom overrides from `.env` if present.

## 4. How to Build and Run the Application

Follow these steps to run the containerised application from scratch:

### Step 1: Clone the repository (if not already done)
```bash
git clone git@github.com:maguzman6/SIT725-Group-88-Campus-Lost-and-Found.git
cd SIT725-Group-88-Campus-Lost-and-Found
```

### Step 2: Build and start the containers
Run Docker Compose in detached mode:
```bash
docker compose up -d --build
```
> This command will download required base images, build the application image from `Dockerfile`, initialise MongoDB with credentials and persistent volumes, and start both containers.

### Step 3: Verify running containers
Check that both `lost_and_found_app` and `mongodb` containers are healthy and running:
```bash
docker compose ps
```

You can view container logs in real-time if needed:
```bash
docker compose logs -f
```
You should see:
```text
Connected to MongoDB
Server running at http://localhost:3000
```

## 5. Accessing the Application via Localhost

Once the containers are started, access the application via:

- **Web Application URL:** [http://localhost:3000](http://localhost:3000)
- **Port:** `3000` (mapped directly to container port `3000`)
- **MongoDB Port:** `27017` (mapped to container port `27017`)

## 6. Verifying Required Endpoints & Functionality

### A. Student Identity Endpoint (`/api/student`)
The `/api/student` REST endpoint uniquely identifies this submission as specified in the task sheet:

- **Endpoint URL:** [http://localhost:3000/api/student](http://localhost:3000/api/student)
- **Method:** `GET`
- **Curl Verification:**
  ```bash
  curl http://localhost:3000/api/student
  ```
- **Expected JSON Response:**
  ```json
  {
    "name": "Max Guzman Aceituno",
    "studentId": "226636976"
  }
  ```

### B. Core Database Functionality

> NOTE:
> In our team's project backlog, the complete implementation of item endpoints (`POST` and `GET`) is scheduled to be delivered under future project cards. At the time of developing this containerisation task (Task 8.1HD), these endpoints were not yet present in the repository. 
> 
> As reflected in the recent commit ([`feat(backend): add item POST and GET endpoints to prove backend and database functionality`](https://github.com/maguzman6/SIT725-Group-88-Campus-Lost-and-Found/commit/c8d9a25a221c7c3697609ecd14dc5501c22ed7ab)), I took the liberty of implementing these `POST` and `GET` endpoints early. This directly proves and showcases that the backend Express service and the MongoDB database service communicate seamlessly, persist data correctly across volumes, and execute full end-to-end operations within this multi-container Docker Compose environment.

The application includes the following endpoints and UI views to demonstrate functional database integration:

- **Get Items:** `GET http://localhost:3000/api/items`
  ```bash
  curl http://localhost:3000/api/items
  ```
- **Post Item:** `POST http://localhost:3000/api/items`
  ```bash
  curl -X POST http://localhost:3000/api/items \
    -H "Content-Type: application/json" \
    -d '{
      "type": "lost",
      "title": "Student ID Card",
      "category": "Cards",
      "date": "2026-09-07",
      "location": "Burwood Library 2nd Floor",
      "description": "Blue Deakin lanyard with student ID card"
    }'
  ```
- **Web UI:** Navigate to [http://localhost:3000/browse.html](http://localhost:3000/browse.html) to browse submitted items or [http://localhost:3000/report.html](http://localhost:3000/report.html) to submit a new report interactively.


## 7. How to Stop the Application

To stop and remove the running containers and network:
```bash
docker compose down
```

To stop containers and also remove the persistent database volume (for a fresh start):
```bash
docker compose down -v
```
