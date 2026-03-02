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
