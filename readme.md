# Go Game Platform Documentation

## Introduction

The Go Game Platform is a web application that allows users to play tsumego problems. It features a Django REST API, a PostgreSQL database, and a React front-end.

## Table of Contents

- [Go Game Platform Documentation](#go-game-platform-documentation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
  - [Frontend Setup](#frontend-setup)
  - [API Endpoints](#api-endpoints)
  - [Usage](#usage)

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 13+

### Clone the Repository

```bash
git clone https://github.com/maximelbv/go-game.git
cd go-game
```

## Backend Setup

```bash
cd api
```

1. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Apply migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Database Setup

1. Ensure PostgreSQL is installed and running.
2. Create a database:
   ```sql
   CREATE DATABASE go_game_db;
   ```
3. Update your env variables. you can find an example in the `.env.example` file
4. You can get games sgf data and json tsumego data by running the import_sgf.py and import_tsumego.py scripts in the core module

## Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm i
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

## API Endpoints

| Endpoint                  | Viewset                 | HTTP Method             | Description                                                   |
| ------------------------- | ----------------------- | ----------------------- | ------------------------------------------------------------- |
| `/users/`                 | `UserViewSet`           | GET, POST               | List users and create a new user                              |
| `/users/<id>/`            | `UserViewSet`           | GET, PUT, PATCH, DELETE | Retrieve, update, partial update, or delete a user            |
| `/user-profiles/`         | `UserProfileViewSet`    | GET, POST               | List user profiles and create a new profile                   |
| `/user-profiles/<id>/`    | `UserProfileViewSet`    | GET, PUT, PATCH, DELETE | Retrieve, update, partial update, or delete a user profile    |
| `/problems/`              | `ProblemViewSet`        | GET, POST               | List problems and create a new problem                        |
| `/problems/<id>/`         | `ProblemViewSet`        | GET, PUT, PATCH, DELETE | Retrieve, update, partial update, or delete a problem         |
| `/problem-attempts/`      | `ProblemAttemptViewSet` | GET, POST               | List problem attempts and create a new attempt                |
| `/problem-attempts/<id>/` | `ProblemAttemptViewSet` | GET, PUT, PATCH, DELETE | Retrieve, update, partial update, or delete a problem attempt |
| `/problem-attempts/me/`   | `ProblemAttemptViewSet` | GET                     | List problem attempts for the authenticated user              |
| `/games/`                 | `GameViewSet`           | GET, POST               | List games and create a new game                              |
| `/games/<id>/`            | `GameViewSet`           | GET, PUT, PATCH, DELETE | Retrieve, update, partial update, or delete a game            |
| `/game-statistics/`       | `GameStatisticsViewSet` | GET                     | List game statistics                                          |
| `/game-statistics/<id>/`  | `GameStatisticsViewSet` | GET                     | Retrieve game statistics                                      |
| `/api/token/`             | `obtain_auth_token`     | POST                    | Obtain authentication token                                   |
| `/api/register/`          | `register_user`         | POST                    | Register a new user                                           |

## Usage

1. Open `http://localhost:5173` in your browser.
2. Register or log in.
3. Select a tsumego problem to solve.
4. Submit your solution and view your progress.
