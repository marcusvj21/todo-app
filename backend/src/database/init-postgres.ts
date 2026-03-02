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
