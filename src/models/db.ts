import "reflect-metadata"
import "dotenv/config"
import { DataSource } from "typeorm"
import { Roles1708948450323 } from "./migrations/01Roles"
import { Users1708952337364 } from "./migrations/02Users"
import { Roles } from "./Roles"
import { Users } from "./Users"
import { Category1717663624117 } from "./migrations/03Category"
import { Game1717663947843 } from "./migrations/04Game"
import { Ad1717669093252 } from "./migrations/05Ad"
import { Chat1717670185305 } from "./migrations/06Chat"

//aqui van las tablas, en migrations, para poderlas usar posteriormente
//a tener en cuenta que el núm tras el nombre es importante para que se creen en ese orden
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Roles, Users],
  migrations: [
    Roles1708948450323,
    Users1708952337364,
    Category1717663624117,
    Game1717663947843,
    Ad1717669093252,
    Chat1717670185305,
  ],
  synchronize: false,
  logging: false,
})
