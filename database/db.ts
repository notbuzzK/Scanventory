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

export const getAllInventory = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM inventory');
    return allRows;
  } catch (error) {
    console.error("Error getting all inventory:", error);
    return [];
  }
};

export const updateInventoryItem = async (values: any) => {
  try {
    const result = await db.runAsync(`
      UPDATE inventory SET name = ?, description = ?, quantity = ?, type = ? WHERE barcode = ?;
    `, [values.name, values.description, values.quantity, values.type, values.barcode]);
    console.log(result.changes);
    console.log("Inventory updated successfully");
    return result;
  } catch (error) {
    console.error("Error updating inventory:", error);
  }
}

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

export const deleteInventoryItem = async (barcode: string) => {
  try {
    const result = await db.runAsync(`
      DELETE FROM inventory WHERE barcode = ?;
    `, [barcode]);
    console.log(result.changes);
    console.log("Inventory deleted successfully");
    return result;
  } catch (error) {
    console.error("Error deleting inventory:", error);
  }
}

export const getAllItemAmounts = async () => {
  try {
    const allRows = await db.getAllAsync(`
      SELECT COUNT(*) as total FROM inventory;
    `);
    return allRows[0].total;
  } catch (error) {
    console.error("Error getting all item amounts:", error);
    return 0;
  }
};

export const getAllTypes = async () => {
  try {
    const allRows = await db.getAllAsync(`
      SELECT COUNT(DISTINCT type) as total FROM inventory;
    `);
    return allRows[0].total;
  } catch (error) {
    console.error("Error getting all types:", error);
    return [];
  }
};

export const getSearchItems = async (searchTerm: string) => {
  try {
    const allRows = await db.getAllAsync(`
      SELECT * FROM inventory WHERE name LIKE ? OR description LIKE ? OR type LIKE ?;
    `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
    return allRows;
  } catch (error) {
    console.error("Error getting search items:", error);
    return [];
  }
};

export const getAllLowQuantityItems = async () => {
  try {
    const allRows = await db.getAllAsync(`
      SELECT * FROM inventory WHERE quantity <= 10;
    `);
    return allRows;
  } catch (error) {
    console.error("Error getting low quantity items:", error);
    return [];
  }
};

export const getAllLowQuantityItemsAmount = async () => {
  try {
    const allRows = await db.getAllAsync(`
      SELECT COUNT(*) as total FROM inventory WHERE quantity <= 10;
    `);
    return allRows[0].total;
  } catch (error) {
    console.error("Error getting low quantity items:", error);
    return 0;
  }
}