# Todo App - Backend API

A simple REST API for a Todo application built with Node.js, Express, TypeScript, and SQLite.

## 🚀 Quick Start

### Installation

```bash
npm install --include=dev
```

### Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
PORT=3000
NODE_ENV=development
DATABASE_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5173
```

### Running the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📊 Health Check

Check if the server is running:
```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-02T17:50:00.000Z",
  "uptime": 123.456
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database connection)
│   ├── controllers/     # Route controllers
│   ├── database/        # Database initialization scripts
│   ├── middleware/      # Custom middleware
│   ├── models/          # TypeScript interfaces and types
│   ├── routes/          # API routes
│   └── index.ts         # Main application entry point
├── dist/                # Compiled JavaScript (generated)
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment variables
├── database.sqlite      # SQLite database file (generated)
├── package.json
└── tsconfig.json
```

## 📦 Dependencies

### Production
- `express` - Web framework
- `cors` - CORS middleware
- `body-parser` - Request body parsing
- `dotenv` - Environment variable management
- `sqlite3` - SQLite database driver

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Development server with hot reload
- `@types/*` - TypeScript type definitions

## 🗄️ Database Schema

### Todos Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key (auto-increment) |
| title | TEXT | Todo title (required) |
| description | TEXT | Todo description (optional) |
| completed | BOOLEAN | Completion status (default: false) |
| createdAt | DATETIME | Creation timestamp |
| updatedAt | DATETIME | Last update timestamp (auto-updated) |

## 🔧 API Endpoints (Coming Soon)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completed status |
| DELETE | `/api/todos/:id` | Delete todo |

## ✅ Completed Tasks

- [x] **BE-001: Project Setup**
  - ✓ Node.js project initialized with Express and TypeScript
  - ✓ Folder structure created (routes, controllers, models, config, database)
  - ✓ Dependencies installed (express, cors, body-parser, dotenv, sqlite3)
  - ✓ Environment variables configured
  - ✓ Basic server setup with health check endpoint

- [x] **BE-002: Database Setup**
  - ✓ SQLite chosen for storage
  - ✓ Todos table schema created (id, title, description, completed, createdAt, updatedAt)
  - ✓ Database connection established
  - ✓ Migration/init script created with auto-update trigger

## 📝 Next Steps

- [ ] **BE-003:** Implement Todo REST API endpoints
- [ ] **BE-004:** Add validation and error handling
- [ ] **BE-005:** Configure CORS and production setup

## 🛠️ Development Notes

- The database file `database.sqlite` is automatically created on first run
- TypeScript is compiled to the `dist/` directory
- Hot reload is enabled in development mode with nodemon
- The `updatedAt` field is automatically updated via database trigger

## 🐛 Troubleshooting

### Dev dependencies not installing
If you're running in a production environment, make sure to use:
```bash
npm install --include=dev
```

### Permission issues with nodemon
Use npx to run nodemon:
```bash
npx nodemon --exec ts-node src/index.ts
```

### Port already in use
Change the PORT in your `.env` file:
```
PORT=3001
```
