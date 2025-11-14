import * as fs from "fs";
import * as path from "path";
import { DatabaseService } from "../services/database.service";

class MigrationManager {
  private migrationsDir: string = path.join(__dirname, "migrations");

  public async run(): Promise<void> {
    try {
      const migrationFiles: string[] = fs
        .readdirSync(this.migrationsDir)
        .filter((file: string) => file.endsWith(".sql"))
        .sort();

      for (const file of migrationFiles) {
        const filePath: string = path.join(this.migrationsDir, file);
        const sql: string = fs.readFileSync(filePath, "utf8");

        await DatabaseService.query(sql);
      }
    } catch (error) {
      throw error;
    }
  }
}

if (require.main === module) {
  const manager = new MigrationManager();
  manager
    .run()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default MigrationManager;
