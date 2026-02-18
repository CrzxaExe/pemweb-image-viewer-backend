import mongoose, { Connection } from "mongoose";
import { Terminal } from "./Terminal";

let connection: Connection | null = null;
/**
 * Utility class to handle database connection
 */
class Database {
  /**
   * Connect ot database
   * @param uri Mongodb uri
   * @returns Promise of mongoose connection
   */
  static async Connect(uri: string): Promise<Connection | undefined> {
    try {
      if (connection) return connection;

      const newConnection = await mongoose.connect(uri, {
        connectTimeoutMS: 10000,
        maxConnecting: 30,
      });

      connection = newConnection.connection;

      Terminal.info("Successfully to connect to database");

      return connection;
    } catch (error: { message: string } | any) {
      Terminal.error(error.message);
    }
  }

  static async Close(): Promise<void> {
    try {
      if (!connection) return;

      await connection.close();

      connection = null;
      Terminal.info("Disconnected with database");
    } catch (error: { message: string } | any) {
      Terminal.error(error.message);
    }
  }
}

export { Database };
