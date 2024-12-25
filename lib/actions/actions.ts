import db from "@/database/db";
import { useRouter } from "expo-router";

export const checkBarcodeStatus = async (barcode: string): Promise<number> => {
  console.log("Checking barcode: ", barcode);

  try {
    const statement = await db.prepareAsync(
      "SELECT * FROM inventory WHERE barcode = $barcode"
    );
    const result = await statement.executeAsync({ $barcode: barcode });

    // Check if rows are returned
    if (result && result.rows && result.rows.length > 0) {
      console.log("Barcode exists");
      return 0; // Barcode exists
    } else {
      console.log("Barcode does not exist");
      return 1; // Barcode does not exist
    }
  } catch (error) {
    console.error("Error checking barcode:", error);
    return -1; // Error indicator
  }
};
