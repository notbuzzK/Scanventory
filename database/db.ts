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

export const checkBarcodeStatus = async (barcode: string) => {
  console.log("Checking barcode: ", barcode);

  try {
    const allRows = await db.getAllAsync(
      "SELECT * FROM inventory WHERE barcode = ?",
      [barcode]
    );
    if (allRows.length > 0) {
      console.log("Barcode exists");
      return 0;
    } else {
      console.log("Barcode does not exist");
      return 1;
    }
    
  } catch (error) {
    console.error("Error checking barcode:", error);
    return -1;
  }
};

export const insertInventory = async (values: any) => {
  try {
    const result = await db.runAsync(`
      INSERT INTO inventory (barcode, name, description, quantity, type) VALUES (?, ?, ?, ?, ?);
    `, [values.barcode, values.name, values.description, values.quantity, values.type]);
    console.log(result.lastInsertRowId, result.changes);
    console.log("Inventory inserted successfully");
    return result;
  } catch (error) {
    console.error("Error inserting inventory:", error);
  }
}

export const getAllInventory = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM inventory');
    for (const row of allRows) {
      console.log("Barcode:", row.barcode, "Name:", row.name, "Description:", row.description, "Quantity:", row.quantity, "Type:", row.type);
    }
  } catch (error) {
    console.error("Error getting all inventory:", error);
  }
}