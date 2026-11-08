require('dotenv').config();
import cors from "cors";
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Server } from '@naiv/codegen-model-typeorm';
import path from 'path';
import { getRouterUpload } from "./upload";

const server = new Server();
server.express?.use(cors({
  origin: "*", // or your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

server.express?.use(getRouterUpload());


server.run({
  port: +(process.env.PORT ?? 9415),
  types_path: path.resolve(__dirname, 'types'),
  implementation_path: path.resolve(__dirname, 'implementation'),
  async beforeStart() {
    await AppDataSource.initialize();
  }
});
