# Todo App - Task Breakdown

**Product Owner:** Marcus  
**Product Manager:** PM  
**Engineers:** Backend, Frontend  
**Timeline:** 1 day

---

## Task Status Legend
- `[ ]` Not Started
- `[>]` In Progress
- `[x]` Complete
- `[!]` Blocked

---

## Backend Tasks

### BE-001: Project Setup ✅
**Owner:** Backend  
**Priority:** P0  
**Estimate:** 1h  
**Status:** COMPLETE  
- [x] Initialize Node.js project (Express, TypeScript)
- [x] Set up folder structure (routes, controllers, models)
- [x] Install dependencies (express, cors, body-parser)
- [x] Configure environment variables
- [x] Basic server setup with health check endpoint

**Notes:** 
- Server runs on port 3000
- Health check available at `/health`
- TypeScript compilation configured
- Development server with hot reload ready

### BE-002: Database Setup ✅
**Owner:** Backend  
**Priority:** P0  
**Estimate:** 1h  
**Dependencies:** BE-001  
**Status:** COMPLETE  
- [x] Choose storage (SQLite for simple/PostgreSQL for production) - **SQLite chosen**
- [x] Create todos table schema (id, title, description, completed, createdAt, updatedAt)
- [x] Set up database connection
- [x] Create migration/init script

**Notes:**
- SQLite database auto-initializes on first run
- Auto-update trigger for `updatedAt` field implemented
- Database connection module in `src/config/database.ts`
- Migration script in `src/database/init.ts`

### BE-003: Todo REST API
**Owner:** Backend  
**Priority:** P0  
**Estimate:** 3h  
**Dependencies:** BE-002  
**Status:** NOT STARTED  
- [ ] POST /api/todos - Create new todo
- [ ] GET /api/todos - List all todos (with optional filter: completed/active)
- [ ] GET /api/todos/:id - Get single todo
- [ ] PUT /api/todos/:id - Update todo
- [ ] DELETE /api/todos/:id - Delete todo
- [ ] PATCH /api/todos/:id/toggle - Toggle completed status

### BE-004: Validation & Error Handling
**Owner:** Backend  
**Priority:** P1  
**Estimate:** 1h  
**Dependencies:** BE-003  
**Status:** NOT STARTED  
- [ ] Input validation (title required, max length)
- [ ] Error handling middleware
- [ ] Proper HTTP status codes
- [ ] Error response formatting

### BE-005: CORS & Production Setup
**Owner:** Backend  
**Priority:** P1  
**Estimate:** 1h  
**Dependencies:** BE-003  
**Status:** NOT STARTED  
- [ ] Configure CORS for frontend origin
- [ ] Add logging middleware
- [ ] API documentation (basic README or Swagger)
- [ ] Docker setup (optional)

**Notes:**
- Basic CORS already configured in server setup
- README.md created with API documentation
- Logging middleware pending

---

## Frontend Tasks

### FE-001: Project Setup
**Owner:** Frontend  
**Priority:** P0  
**Estimate:** 1h  
- [ ] Initialize React app (Vite or Create React App)
- [ ] Install dependencies (axios/fetch for API, optional: TailwindCSS)
- [ ] Set up folder structure (components, services, utils)
- [ ] Configure API base URL (environment variables)

### FE-002: API Service Layer
**Owner:** Frontend  
**Priority:** P0  
**Estimate:** 1h  
**Dependencies:** FE-001  
- [ ] Create API client service
- [ ] Implement all API methods (getTodos, createTodo, updateTodo, deleteTodo, toggleTodo)
- [ ] Error handling for API calls

### FE-003: Todo List Component
**Owner:** Frontend  
**Priority:** P0  
**Estimate:** 3h  
**Dependencies:** FE-002  
- [ ] TodoList component (displays all todos)
- [ ] TodoItem component (single todo with checkbox, edit, delete)
- [ ] State management (useState or Context API)
- [ ] Fetch and display todos on mount
- [ ] Loading and error states

### FE-004: Add/Edit Todo Form
**Owner:** Frontend  
**Priority:** P0  
**Estimate:** 2h  
**Dependencies:** FE-003  
- [ ] AddTodo component (form to create new todo)
- [ ] Inline editing for existing todos
- [ ] Form validation (title required)
- [ ] Optimistic UI updates

### FE-005: Todo Actions & Filters
**Owner:** Frontend  
**Priority:** P1  
**Estimate:** 2h  
**Dependencies:** FE-003  
- [ ] Toggle todo completion (checkbox)
- [ ] Delete todo (with confirmation)
- [ ] Filter tabs (All / Active / Completed)
- [ ] Clear completed button
- [ ] Todo counter (X items left)

### FE-006: UI Polish
**Owner:** Frontend  
**Priority:** P1  
**Estimate:** 2h  
**Dependencies:** FE-004, FE-005  
- [ ] Responsive design (mobile-friendly)
- [ ] Basic styling (clean, simple UI)
- [ ] Animations (fade in/out, transitions)
- [ ] Empty state message
- [ ] Accessibility (keyboard navigation, ARIA labels)

---

## MVP Features

- [ ] Add new todo
- [ ] View all todos
- [ ] Mark todo as complete/incomplete
- [ ] Edit todo
- [ ] Delete todo
- [ ] Filter by status (all/active/completed)
- [x] Persist data in database
- [ ] Clean, responsive UI

---

## Tech Stack

**Backend:**
- Node.js + Express ✅
- TypeScript ✅
- SQLite ✅
- REST API (in progress)

**Frontend:**
- React (Vite or CRA)
- Axios or Fetch API
- CSS or TailwindCSS
- Optional: Context API or Zustand for state

---

## API Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | /health | Health check | ✅ Complete |
| GET | /api/todos | Get all todos (query: ?completed=true/false) | 🔜 Next |
| GET | /api/todos/:id | Get single todo | 🔜 Next |
| POST | /api/todos | Create new todo (body: {title, description?}) | 🔜 Next |
| PUT | /api/todos/:id | Update todo (body: {title, description, completed}) | 🔜 Next |
| PATCH | /api/todos/:id/toggle | Toggle completed status | 🔜 Next |
| DELETE | /api/todos/:id | Delete todo | 🔜 Next |

---

## Todo Schema

```typescript
{
  id: number,
  title: string,
  description?: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string
}
```

---

## Progress Summary

**Backend:**
- ✅ BE-001: Project Setup (Complete)
- ✅ BE-002: Database Setup (Complete)
- 🔜 BE-003: Todo REST API (Next)
- ⏳ BE-004: Validation & Error Handling (Pending)
- ⏳ BE-005: CORS & Production Setup (Pending)

**Frontend:**
- ⏳ All tasks pending (waiting for backend API)

---

**Last Updated:** 2026-03-02 17:50 UTC by Backend Engineer
