"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("./domain/appointments/router"));
const router_2 = __importDefault(require("./domain/auth/router"));
const router_3 = __importDefault(require("./domain/roles/router"));
const router_4 = __importDefault(require("./domain/services/router"));
const router_5 = __importDefault(require("./domain/users/router"));
const router = (0, express_1.Router)();
//rutas de roles
router.use("/", router_3.default);
//rutas de auth
router.use("/auth", router_2.default);
//rutas de user
router.use("/", router_5.default);
//rutas de services
router.use("/", router_4.default);
//rutas de appointments
router.use("/", router_1.default);
exports.default = router;
