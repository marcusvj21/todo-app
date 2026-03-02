# Todo App - Frontend

React frontend application for the Todo App, built with Vite, Axios, and TailwindCSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # React components (TodoList, TodoItem, etc.)
├── services/       # API service layer
│   └── api.js     # Axios client with all API methods
├── utils/         # Utility functions
├── App.jsx        # Main application component
└── main.jsx       # Application entry point
```

## 🔧 Configuration

- **API Base URL:** Configure in `.env` file
  ```
  VITE_API_BASE_URL=http://localhost:3000/api
  ```

## 📡 API Service

The `todoApi` service provides the following methods:

- `getTodos(filter)` - Get all todos (filter: 'all', 'active', 'completed')
- `getTodoById(id)` - Get a single todo
- `createTodo(todoData)` - Create a new todo
- `updateTodo(id, updates)` - Update a todo
- `toggleTodo(id)` - Toggle completion status
- `deleteTodo(id)` - Delete a todo

All methods include built-in error handling and return meaningful error messages.

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls
- **TailwindCSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📝 Development Status

- ✅ FE-001: Project Setup (Complete)
- ✅ FE-002: API Service Layer (Complete)
- ⏳ FE-003: Todo List Component (Pending)
- ⏳ FE-004: Add/Edit Todo Form (Pending)
- ⏳ FE-005: Todo Actions & Filters (Pending)
- ⏳ FE-006: UI Polish (Pending)

## 🔗 Backend Integration

Expects backend API to be running at `http://localhost:3000/api/todos`

See `TASKS.md` in the workspace root for full project details.
