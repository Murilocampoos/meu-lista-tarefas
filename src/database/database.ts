import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function runMigrations(db?: SQLite.SQLiteDatabase): Promise<void> {
  const database = db ?? dbInstance ?? (await SQLite.openDatabaseAsync('tasks.db'));
  await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de perfil do usuário (registro único com id fixo = 1)
    CREATE TABLE IF NOT EXISTS profile (
      id       INTEGER PRIMARY KEY,
      name     TEXT    NOT NULL DEFAULT '',
      email    TEXT    NOT NULL DEFAULT '',
      photoUri TEXT
    );
  `);
}

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('tasks.db');
    await runMigrations(dbInstance);
  }
  return dbInstance;
}
