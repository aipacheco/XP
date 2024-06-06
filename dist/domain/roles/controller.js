"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRole = void 0;
const Repository = __importStar(require("./repository"));
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //si hay body y las keys vienen rellenas (no es un objeto vacío)
    if (req.body && Object.keys(req.body).length !== 0) {
        //se accede al campo del json name
        const name = req.body.name;
        //validaciones
        if (name.length > 20) {
            //se rellena la response dependiendo del error
            return res.status(400).json({
                success: false,
                message: "Role name must be under 10 characters",
            });
        }
        if (name === "") {
            return res.status(400).json({
                success: false,
                message: "Role name must be defined",
            });
        }
        //se le pasa el name si ha pasado las validaciones a repository
        //y devolverá una respuesta según si ha ido bien o no
        try {
            const result = yield Repository.createRole(name);
            //si llega vacío es que se ha creado en repository, lo traemos para devolver una response
            if (!result) {
                return res.status(201).json({
                    success: true,
                    message: "Role created",
                });
                //si se recibe un obj de tipo Roles, es que ya existía el registro
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Role existing, introduce new one",
                });
            }
            //manejo de errores del servidor
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while creating the role",
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: "No data provided.",
        });
    }
});
exports.createRole = createRole;
