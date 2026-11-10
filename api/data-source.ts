// require('dotenv').config();
// import { DataSource, DataSourceOptions } from "typeorm";

// // const config: DataSourceOptions = {
// //   type: (process.env.DB_TYPE || 'postgres') as any,
// //   host: process.env.DB_HOST || 'localhost',
// //   port: +(process.env.DB_PORT || 5432),
// //   username: process.env.DB_USERNAME || 'postgres',
// //   password: process.env.DB_PASSWORD || 'secretpassword',
// //   database: process.env.DB_NAME || 'mydb',
// //   synchronize: false,
// //   logging: false,
// //   migrations: [
// //     __dirname + '/migration/**.ts'
// //   ],
// //   entities: [
// //     __dirname + '/types/model/**/*.{ts,js}'
// //   ]
// // };

// // export const AppDataSource = new DataSource(config);

// import "reflect-metadata";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   url: process.env.DATABASE_URL || "postgresql://localhost:5432/mydb",
//   ssl: process.env.DATABASE_URL?.includes("render.com")
//     ? { rejectUnauthorized: false }
//     : false,
//   synchronize: false,
//   logging: false,
//   entities: [__dirname + "/types/model/**/*.{ts,js}"],
//   migrations: [__dirname + "/migration/**.ts"],
// });


//CONFIG 2
// require('dotenv').config();
// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { URL } from "url";

// // Parse DATABASE_URL if present
// let dbConfig: any;

// if (process.env.DATABASE_URL) {
//   const dbUrl = new URL(process.env.DATABASE_URL);
  
//   dbConfig = {
//     type: "postgres" as const,
//     host: dbUrl.hostname,
//     port: parseInt(dbUrl.port) || 5432,
//     username: dbUrl.username,
//     password: dbUrl.password,
//     database: dbUrl.pathname.slice(1), // Remove leading /
//     ssl: dbUrl.hostname.includes("render.com") || dbUrl.hostname.includes("supabase.com")
//       ? { rejectUnauthorized: false }
//       : false,
//     extra: {
//       // Pass options to pg driver to prefer IPv4
//       connectionTimeoutMillis: 10000,
//     },
//     synchronize: true,
//     logging: false,
//     entities: [__dirname + "/types/model/**/*.{ts,js}"],
//     migrations: [__dirname + "/migration/**.ts"],
//   };
// } else {
//   dbConfig = {
//     type: "postgres" as const,
//     host: process.env.DB_HOST || "localhost",
//     port: +(process.env.DB_PORT || 5432),
//     username: process.env.DB_USERNAME || "postgres",
//     password: process.env.DB_PASSWORD || "123123",
//     database: process.env.DB_NAME || "ppdb",
//     synchronize: true,
//     logging: false,
//     entities: [__dirname + "/types/model/**/*.{ts,js}"],
//     migrations: [__dirname + "/migration/**.ts"],
//   };
// }

// export const AppDataSource = new DataSource(dbConfig);

//CONFIG 3
require("dotenv").config();
import "reflect-metadata";
import { DataSource } from "typeorm";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === "production") {
  throw new Error("DATABASE_URL is missing in production environment");
}

const dbConfig = databaseUrl
  ? {
      type: "postgres" as const,
      url: databaseUrl,

      // Required for Neon PostgreSQL
      ssl: {
        rejectUnauthorized: false,
      },

      extra: {
        connectionTimeoutMillis: 10000,
      },

      synchronize: false,
      logging: false,
      entities: [__dirname + "/types/model/**/*.{ts,js}"],
      migrations: [__dirname + "/migration/**.ts"],
    }
  : {
      // Local development configuration
      type: "postgres" as const,
      host: process.env.DB_HOST || "localhost",
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "123123",
      database: process.env.DB_NAME || "ppdb",

      synchronize: false,
      logging: false,
      entities: [__dirname + "/types/model/**/*.{ts,js}"],
      migrations: [__dirname + "/migration/**.ts"],
    };

export const AppDataSource = new DataSource(dbConfig);
