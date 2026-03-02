# 📝 Todo App - Full Stack Application

A modern, full-stack Todo application built with React, Express, and PostgreSQL.

## 🚀 Live Demo

> **Note**: Deployment in progress. URLs will be added once live.

- **Frontend**: TBD (Vercel)
- **Backend API**: TBD (Railway/Render)
- **Repository**: TBD (GitHub)

---

## 🏗️ Architecture

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Hosting**: Vercel

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express 5
- **Database**: PostgreSQL (production) / SQLite (local dev)
- **Hosting**: Railway or Render

---

## 📁 Project Structure

```
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── App.jsx       # Main app component
│   │   ├── services/     # API service layer
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/              # Express backend API
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   ├── config/       # Database configurations
│   │   ├── database/     # DB initialization
│   │   ├── models/       # Data models
│   │   └── routes/       # API routes
│   ├── package.json
│   └── tsconfig.json
│
├── DEPLOYMENT.md         # Deployment guide
├── POSTGRES_MIGRATION.md # Database migration guide
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production) or SQLite will work locally

### Local Development

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd team-workspace
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
# For SQLite (local dev):
# No DATABASE_URL needed
# For PostgreSQL (production-like):
# DATABASE_URL=postgresql://user:password@localhost:5432/todoapp
EOF

# Start backend
npm run dev
# Server runs on http://localhost:3000
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:3000/api
EOF

# Start frontend
npm run dev
# App runs on http://localhost:5173
```

#### 4. Open in browser
Visit http://localhost:5173

---

## 📡 API Endpoints

### Base URL: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos (optional: `?completed=true/false`) |
| GET | `/todos/:id` | Get single todo by ID |
| POST | `/todos` | Create new todo |
| PUT | `/todos/:id` | Update todo |
| PATCH | `/todos/:id/toggle` | Toggle completed status |
| DELETE | `/todos/:id` | Delete todo |

### Health Check
- GET `/health` - Server health status

### Example Requests

**Create Todo**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Get All Todos**
```bash
curl http://localhost:3000/api/todos
```

**Toggle Completion**
```bash
curl -X PATCH http://localhost:3000/api/todos/1/toggle
```

---

## 🔧 Configuration

### Frontend Environment Variables
```bash
VITE_API_BASE_URL=http://localhost:3000/api  # Backend API URL
```

### Backend Environment Variables
```bash
PORT=3000                                     # Server port
NODE_ENV=development                          # Environment
CORS_ORIGIN=http://localhost:5173            # Frontend URL
DATABASE_URL=postgresql://...                 # PostgreSQL connection string
```

---

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions.

### Quick Deployment Steps:

1. **Create GitHub Repository**
   ```bash
   gh repo create todo-app-production --public --source=. --remote=origin --push
   ```

2. **Deploy Frontend to Vercel**
   - Import GitHub repo at https://vercel.com/new
   - Set root directory to `frontend`
   - Add `VITE_API_BASE_URL` environment variable

3. **Deploy Backend to Railway**
   - Import GitHub repo at https://railway.app
   - Set root directory to `backend`
   - Add PostgreSQL database
   - Configure CORS_ORIGIN

4. **Migrate to PostgreSQL**
   - See [POSTGRES_MIGRATION.md](./POSTGRES_MIGRATION.md)
   - Update backend dependencies
   - Use PostgreSQL connection string

---

## 🧪 Testing

### Manual Testing
```bash
# Backend tests (health check)
curl http://localhost:3000/health

# Create a todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo"}'

# Get all todos
curl http://localhost:3000/api/todos
```

### Frontend Testing
1. Open http://localhost:5173
2. Create a new todo
3. Mark it as completed
4. Edit the todo
5. Delete the todo

---

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Vite 7.3.1
- Tailwind CSS 4.2.1
- Axios 1.13.6

### Backend
- Node.js 22+
- TypeScript 5.9.3
- Express 5.2.1
- PostgreSQL (via `pg` 8.13.1)
- SQLite3 5.1.7 (local dev only)
- CORS 2.8.6

---

## 📝 Features

- ✅ Create, Read, Update, Delete todos
- ✅ Mark todos as completed
- ✅ Filter todos (All / Active / Completed)
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API
- ✅ TypeScript backend
- ✅ Environment-based configuration
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Auto-updating timestamps
- ✅ Production-ready PostgreSQL support

---

## 🔒 Security

- Environment variables for sensitive data
- CORS configured for specific origins
- No hardcoded credentials
- `.env` files ignored in git
- SQL injection protection via parameterized queries

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### CORS Errors
- Ensure backend `CORS_ORIGIN` matches frontend URL exactly
- Check for trailing slashes
- Verify both services are running

### Database Issues
- **SQLite**: Check file permissions for `database.sqlite`
- **PostgreSQL**: Verify `DATABASE_URL` format and credentials
- Run migrations: `npm run dev` (auto-initializes tables)

---

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [POSTGRES_MIGRATION.md](./POSTGRES_MIGRATION.md) - Database migration guide
- [frontend/README.md](./frontend/README.md) - Frontend specific docs
- [backend/README.md](./backend/README.md) - Backend specific docs

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

ISC License - feel free to use this project for learning and personal projects.

---

## 👥 Authors

Built by the OpenClaw AI Team

---

## 🎯 Roadmap

- [ ] User authentication
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search and advanced filtering
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Real-time updates (WebSockets)
- [ ] Todo sharing between users

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel for hosting and deployment tools
- Railway/Render for backend hosting
- The open-source community

---

**Happy coding! 🚀**
