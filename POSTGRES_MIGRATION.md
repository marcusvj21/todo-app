# PostgreSQL Migration Guide

## 🎯 Why Migrate?

SQLite is file-based and doesn't work in serverless/stateless environments like Vercel, Railway, or Render. PostgreSQL is a client-server database that works perfectly in production.

---

## 📋 Migration Steps

### 1. Install PostgreSQL Driver

```bash
cd /home/node/.openclaw/team-workspace/backend
npm install pg
npm install --save-dev @types/pg
npm uninstall sqlite3
```

### 2. Update Database Configuration

**Create new file**: `backend/src/config/postgres.ts`

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error:', err);
  process.exit(-1);
});

export default pool;
```

### 3. Update Database Initialization

**Update**: `backend/src/database/init.ts`

```typescript
import pool from '../config/postgres';

export const initDatabase = async (): Promise<void> => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await pool.query(createTableQuery);
    console.log('✅ Todos table created successfully');
  } catch (error) {
    console.error('❌ Error creating todos table:', error);
    throw error;
  }
};

export const createUpdateTrigger = async (): Promise<void> => {
  try {
    // Create function for updating timestamp
    const createFunctionQuery = `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `;

    const createTriggerQuery = `
      DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
      CREATE TRIGGER update_todos_updated_at
        BEFORE UPDATE ON todos
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

    await pool.query(createFunctionQuery);
    await pool.query(createTriggerQuery);
    console.log('✅ Update trigger created successfully');
  } catch (error) {
    console.error('❌ Error creating trigger:', error);
    throw error;
  }
};
```

### 4. Update Todo Model

**Update**: `backend/src/models/Todo.ts`

```typescript
import pool from '../config/postgres';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export class TodoModel {
  // Get all todos
  static async getAll(filter?: { completed?: boolean }): Promise<Todo[]> {
    try {
      let query = 'SELECT * FROM todos';
      const params: any[] = [];

      if (filter?.completed !== undefined) {
        query += ' WHERE completed = $1';
        params.push(filter.completed);
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch todos: ${error}`);
    }
  }

  // Get todo by ID
  static async getById(id: number): Promise<Todo | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM todos WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch todo: ${error}`);
    }
  }

  // Create new todo
  static async create(data: CreateTodoInput): Promise<Todo> {
    try {
      const result = await pool.query(
        'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
        [data.title, data.description || null]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed to create todo: ${error}`);
    }
  }

  // Update todo
  static async update(id: number, data: UpdateTodoInput): Promise<Todo | null> {
    try {
      const updates: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      if (data.title !== undefined) {
        updates.push(`title = $${paramIndex++}`);
        params.push(data.title);
      }

      if (data.description !== undefined) {
        updates.push(`description = $${paramIndex++}`);
        params.push(data.description);
      }

      if (data.completed !== undefined) {
        updates.push(`completed = $${paramIndex++}`);
        params.push(data.completed);
      }

      if (updates.length === 0) {
        return await this.getById(id);
      }

      params.push(id);
      const query = `
        UPDATE todos 
        SET ${updates.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING *
      `;

      const result = await pool.query(query, params);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to update todo: ${error}`);
    }
  }

  // Toggle completed status
  static async toggle(id: number): Promise<Todo | null> {
    try {
      const result = await pool.query(
        'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to toggle todo: ${error}`);
    }
  }

  // Delete todo
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query(
        'DELETE FROM todos WHERE id = $1 RETURNING id',
        [id]
      );
      return result.rowCount! > 0;
    } catch (error) {
      throw new Error(`Failed to delete todo: ${error}`);
    }
  }
}
```

### 5. Update Environment Variables

**Update**: `backend/.env`

```bash
# PostgreSQL Connection
DATABASE_URL=postgresql://username:password@host:5432/database

# Server Config
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
```

**For production** (Railway/Render/Vercel):
- `DATABASE_URL` will be auto-injected by the platform
- Or manually add from Supabase/Neon/Vercel Postgres

### 6. Update package.json

```json
{
  "dependencies": {
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "pg": "^8.13.1"
  },
  "devDependencies": {
    "@types/body-parser": "^1.19.6",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/node": "^25.3.3",
    "@types/pg": "^8.11.10",
    "nodemon": "^3.1.14",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3"
  }
}
```

### 7. Test Locally (Optional)

If you want to test locally with PostgreSQL:

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Or use Docker
docker run --name postgres-todo \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=todoapp \
  -p 5432:5432 \
  -d postgres:14

# Update .env
DATABASE_URL=postgresql://postgres:password@localhost:5432/todoapp

# Run migrations
npm run dev
```

---

## 🎯 Key Differences: SQLite vs PostgreSQL

| Feature | SQLite | PostgreSQL |
|---------|--------|------------|
| Type | File-based | Client-Server |
| Auto-increment | `AUTOINCREMENT` | `SERIAL` |
| Boolean | `BOOLEAN` / `0/1` | `BOOLEAN` / `true/false` |
| Placeholders | `?` | `$1, $2, $3` |
| Column names | `camelCase` OK | `snake_case` recommended |
| Triggers | Inline syntax | Function + Trigger |
| Connection | `sqlite3.Database()` | `Pool` from `pg` |

---

## 🚀 Database Providers

### Vercel Postgres
- **Pros**: Integrated with Vercel, auto-configured
- **Cons**: Only works with Vercel deployments
- **Setup**: Vercel Dashboard → Storage → Postgres

### Supabase
- **Pros**: Free tier, easy setup, includes admin UI
- **Cons**: Requires account
- **Setup**: https://supabase.com → New Project
- **URL Format**: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### Neon
- **Pros**: Serverless, autoscaling, free tier
- **Cons**: Newer service
- **Setup**: https://neon.tech → New Project
- **URL Format**: `postgresql://[USER]:[PASSWORD]@[HOST]/[DBNAME]`

### Railway Postgres
- **Pros**: Auto-provision with Railway deployment
- **Cons**: Requires Railway account
- **Setup**: Railway Dashboard → Add Database

---

## ✅ Migration Checklist

- [ ] Install `pg` package
- [ ] Remove `sqlite3` package
- [ ] Update `config/postgres.ts`
- [ ] Update `database/init.ts`
- [ ] Update `models/Todo.ts`
- [ ] Update `.env` with `DATABASE_URL`
- [ ] Test locally (optional)
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Deploy to production
- [ ] Verify database tables created
- [ ] Test API endpoints

---

## 🐛 Common Issues

### Connection Refused
- Check `DATABASE_URL` format
- Verify database is running
- Check firewall/network rules

### SSL Error in Production
- Add `ssl: { rejectUnauthorized: false }` to pool config
- Most cloud providers require SSL

### Table Not Found
- Ensure `initDatabase()` runs on startup
- Check logs for migration errors
- Manually run CREATE TABLE queries

### Environment Variable Not Found
- Verify `DATABASE_URL` is set in platform settings
- Check `.env` file is not in `.gitignore` for local dev

---

**Migration complete! Your app is now production-ready. 🎉**
