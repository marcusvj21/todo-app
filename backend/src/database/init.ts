import db from '../config/database';

export const initDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating todos table:', err.message);
        reject(err);
      } else {
        console.log('Todos table created successfully');
        resolve();
      }
    });
  });
};

// Create a trigger to auto-update the updatedAt timestamp
export const createUpdateTrigger = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const triggerQuery = `
      CREATE TRIGGER IF NOT EXISTS update_todos_timestamp 
      AFTER UPDATE ON todos
      FOR EACH ROW
      BEGIN
        UPDATE todos SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END
    `;

    db.run(triggerQuery, (err) => {
      if (err) {
        console.error('Error creating trigger:', err.message);
        reject(err);
      } else {
        console.log('Update trigger created successfully');
        resolve();
      }
    });
  });
};
