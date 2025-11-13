import express, { Application } from "express";
import { createServer } from "http";
import compression from "compression";
import { config } from "./config";

import { DatabaseService } from "./services/database.service";

class TelemedicineServer {
  private app: Application;
  private server: any;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware() {
    this.app.use(compression());
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  }

  private setupRoutes() {
    this.app.get("/health", (req, res) => {
      res.json({ status: "healthy", timestamp: new Date().toISOString() });
    });

    this.app.get("/ready", async (req, res) => {
      const dbHealthy = await DatabaseService.healthCheck();

      if (dbHealthy) {
        res.json({ status: "ready" });
      } else {
        res.status(503).json({ status: "not ready" });
      }
    });
  }

  private setupErrorHandling() {}

  public async start(): Promise<void> {
    try {
      await DatabaseService.connect();
      this.server = createServer(this.app);

      this.server.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

const server = new TelemedicineServer();
server.start();
