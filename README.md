# Course Progress Tracker

A small full-stack app for creating courses, adding lessons, and tracking lesson completion progress.

## Run the project

Prerequisites: Docker and Docker Compose.

```bash
docker compose up --build
```

Open the app at <http://localhost:3000>. The backend health endpoint is available at <http://localhost:4000/health>.

To stop the services:

```bash
docker compose down
```

PostgreSQL data is stored in the `postgres_data` Docker volume. To remove the data as well, run `docker compose down -v`.

## Technologies used

- Frontend: React 18, Vite, HTML, CSS
- Backend: Node.js, Express
- Database: PostgreSQL 16
- ORM: Sequelize
- Infrastructure: Docker Compose

All tools and dependencies were installed or configured by following their official documentation.

## Features completed

- View courses and select a course
- Create and delete courses
- Add lessons to a course
- Mark lessons complete or incomplete
- Delete lessons
- Display completed lesson count and progress percentage
- Basic loading and error states
- Validation for required course and lesson titles
- Persistent PostgreSQL storage

## Not completed

- Editing course or lesson text
- Authentication and user accounts
- Automated backend test suite
- Database migrations (Sequelize synchronizes the tables on startup for this small task)

## API endpoints

The API base URL is `http://localhost:4000/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/courses` | List courses with completion fields for their lessons |
| POST | `/courses` | Create a course; `title` is required |
| GET | `/courses/:id` | Get one course with its lessons |
| DELETE | `/courses/:id` | Delete a course and its lessons |
| GET | `/courses/:courseId/lessons` | List lessons for a course |
| POST | `/courses/:courseId/lessons` | Add a lesson; `title` is required |
| PATCH | `/lessons/:id` | Update lesson title, description, or `isCompleted` |
| DELETE | `/lessons/:id` | Delete a lesson |

`isCompleted`, when supplied, must be a boolean. Progress is calculated as completed lessons divided by total lessons, with an empty course shown as `0%`.

## Database

The application uses PostgreSQL with two tables:

- `courses`: `id`, `title`, `description`, `created_at`
- `lessons`: `id`, `course_id`, `title`, `description`, `is_completed`, `created_at`

Each lesson belongs to one course. Deleting a course cascades to its lessons. In Docker, the backend connects using `DATABASE_URL` with the PostgreSQL service hostname `postgres`.

## Docker description

`docker compose up --build` starts:

- `postgres`: PostgreSQL 16 on port `5432`
- `backend`: Express API on port `4000`
- `frontend`: Vite production build served by Nginx on port `3000`

The frontend receives the API URL at image build time through `VITE_API_URL`.

## Submission note

The required course and lesson workflow was tested with Docker Compose and is working. No known runtime issues remain. 

## AI Usage Report

- AI tool used: ChatGpt, Claude
- What I used AI for: Reviewing the requirements, drafting small code changes, write styles.css, README.
- Additional tools: Prettier was used for formatting.
- 2–3 example prompts:
  - "Check that the API validates required course and lesson titles and that lesson completion accepts booleans only."
  - "Review the project against the task requirements and identify missing submission documentation."
- What I changed manually: Reviewed and adjusted the project structure, API behavior, frontend behavior, Docker configuration. I also ran the build and Compose validation commands.
- What was difficult: Keeping the frontend state synchronized after course and lesson mutations and configuring the frontend container to use the backend API URL.