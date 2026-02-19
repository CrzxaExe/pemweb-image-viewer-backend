import { MongoClient, ServerApiVersion } from "mongodb";
import { Terminal } from "./Terminal";

let connection: MongoClient | null = null;

/**
 * Utility class to handle database connection
 */
class Database {
  /**
   * Connect to Database
   * @param uri Mongodb uri
   * @returns Promise of mongoose connection
   */
  static async Connect(uri: string): Promise<MongoClient | undefined> {
    try {
      if (connection) return connection;

      const newConnection = await new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }).connect();

      connection = newConnection;

      Terminal.info("Successfully to connect to database");

      return connection;
    } catch (error: { message: string } | any) {
      Terminal.error(error.message);
    }
  }

  /**
   * Close connection to Database
   *
   * @returns nothing
   */
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
