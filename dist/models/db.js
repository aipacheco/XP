"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const _01Roles_1 = require("./migrations/01Roles");
const _02Users_1 = require("./migrations/02Users");
const _03Services_1 = require("./migrations/03Services");
const _04Appointmens_1 = require("./migrations/04Appointmens");
const Roles_1 = require("./Roles");
const Users_1 = require("./Users");
const Services_1 = require("./Services");
const Appointments_1 = require("./Appointments");
//aqui van las tablas, en migrations, para poderlas usar posteriormente
//a tener en cuenta que el núm tras el nombre es importante para que se creen en ese orden 
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Roles_1.Roles, Users_1.Users, Services_1.Services, Appointments_1.Appointments],
    migrations: [
        _01Roles_1.Roles1708948450323,
        _02Users_1.Users1708952337364,
        _03Services_1.Services1709024097884,
        _04Appointmens_1.Appointments1709024653887,
    ],
    synchronize: false,
    logging: false,
});
