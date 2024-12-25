import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('scanventory');
export const initializeDatabase = () => {

    db.execAsync(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      barcode TEXT UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      quantity INTEGER,
      type TEXT NOT NULL);
    `); 
}

export default db;

export const insertInventory = async (barcode: string, name: string, description: string, quantity: number, type: string) => {
  const result = await db.runAsync(`
    INSERT INTO inventory (barcode, name, description, quantity, type) VALUES (?, ?, ?, ?, ?);
  `, [barcode, name, description, quantity, type]);
  console.log(result.lastInsertRowId, result.changes);
  return result;
}