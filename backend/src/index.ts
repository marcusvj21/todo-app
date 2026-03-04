import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDatabase, createUpdateTrigger } from './database/init-postgres';
import { TodoModel, CreateTodoInput, UpdateTodoInput } from './models/TodoPostgres';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Todo API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      todos: '/api/todos'
    }
  });
});

// Todo Routes

// GET /api/todos - Get all todos (with optional filter)
app.get('/api/todos', async (req: Request, res: Response) => {
  try {
    const completed = req.query.completed;
    const filter = completed !== undefined ? { completed: completed === 'true' } : undefined;
    const todos = await TodoModel.getAll(filter);
    res.json(todos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const todo = await TodoModel.getById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', async (req: Request, res: Response) => {
  try {
    const { title, description }: CreateTodoInput = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const todo = await TodoModel.create({ title, description });
    res.status(201).json(todo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const updateData: UpdateTodoInput = req.body;
    const todo = await TodoModel.update(id, updateData);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/todos/:id/toggle - Toggle todo completion status
app.patch('/api/todos/:id/toggle', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const todo = await TodoModel.toggle(id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid todo ID' });
    }
    
    const deleted = await TodoModel.delete(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    await createUpdateTrigger();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check available at http://localhost:${PORT}/health`);
      console.log(`📝 Todo API available at http://localhost:${PORT}/api/todos`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
