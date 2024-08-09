# Full-Stack Application

## Overview

This project is a full-stack application consisting of a backend service and a frontend application. The backend service is built with Node.js and Express, while the frontend application is built with React. Both services are containerized using Docker.

## Project Structure

- **/backend** - Contains the backend service.
- **/frontend** - Contains the frontend application.
- **docker-compose.yml** - Docker Compose configuration to run both services together.

## Setup

### Prerequisites

- Docker (for containerization)
- Docker Compose (for orchestrating containers)

### Installation

1. Clone the repository:

   git clone <repository-url>
   cd <repository-directory>

   ```

   Navigate to the root directory and build and start the services using Docker Compose:
   docker-compose up --build

   Start the backend server:
        -cd back-end
        -npm start

    Navigate to the frontend directory and install dependencies:
       -cd front-end
       -npm install
       -npm start
   ```

Backend Endpoints:

      -GET /files/list - Get a list of available files.
      -GET /files/data?fileName=<fileName> - Get data from a specific file.

### Run The Project :

-docker compose up --build

### Test :

```
    1.Backend
      -cd back-end
      -npm test
```

```

```
